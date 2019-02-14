import * as graphene from "graphene-pk11";
import { Convert } from "pvtsutils";
import * as core from "webcrypto-core";
import { CryptoKey } from "../../key";
import { P11Session } from "../../p11_session";
import * as utils from "../../utils";
import { HmacCryptoKey } from "./key";

export class HmacProvider extends core.HmacProvider {

  constructor(private session: P11Session) {
    super();
  }

  public async onGenerateKey(algorithm: HmacKeyGenParams, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey> {
    return new Promise<CryptoKey>((resolve, reject) => {
      algorithm.length = algorithm.length
        ? algorithm.length
        : this.getDefaultLength((algorithm.hash as Algorithm).name) >> 3;

      const template = this.createTemplate(algorithm, extractable, keyUsages);
      template.valueLen = algorithm.length << 3;

      // PKCS11 generation
      this.session.value.generateKey(graphene.KeyGenMechanism.GENERIC_SECRET, template, (err, aesKey) => {
        try {
          if (err) {
            reject(new core.CryptoError(`HMAC: Cannot generate new key\n${err.message}`));
          } else {
            resolve(new HmacCryptoKey(aesKey, { ...algorithm, name: this.name } as HmacKeyAlgorithm));
          }
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  public async onSign(algorithm: Algorithm, key: HmacCryptoKey, data: ArrayBuffer): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const mechanism = this.wc2pk11(algorithm, key.algorithm);
      this.session.value.createSign(mechanism, key.key).once(Buffer.from(data), (err, data2) => {
        if (err) {
          reject(err);
        } else {
          resolve(new Uint8Array(data2).buffer);
        }
      });
    });
  }

  public async onVerify(algorithm: Algorithm, key: HmacCryptoKey, signature: ArrayBuffer, data: ArrayBuffer): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const mechanism = this.wc2pk11(algorithm, key.algorithm);
      this.session.value.createVerify(mechanism, key.key).once(Buffer.from(data), Buffer.from(signature), (err, ok) => {
        if (err) {
          reject(err);
        } else {
          resolve(ok);
        }
      });
    });
  }

  public async onImportKey(format: KeyFormat, keyData: JsonWebKey | ArrayBuffer, algorithm: HmacImportParams, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey> {
    // get key value
    let value: ArrayBuffer;

    switch (format.toLowerCase()) {
      case "jwk":
        if (!("k" in keyData)) {
          throw new core.OperationError("jwk.k: Cannot get required property");
        }
        keyData = Convert.FromBase64Url(keyData.k);
      case "raw":
        value = keyData as ArrayBuffer;
        break;
      default:
        throw new core.OperationError("format: Must be 'jwk' or 'raw'");
    }
    // prepare key algorithm
    const hmacAlg: HmacKeyGenParams = {
      ...algorithm,
      name: this.name,
      length: value.byteLength * 8 || this.getDefaultLength((algorithm.hash as Algorithm).name),
    };
    const template: graphene.ITemplate = this.createTemplate(hmacAlg, extractable, keyUsages);
    template.value = Buffer.from(value);

    // create session object
    const sessionObject = this.session.value.create(template);
    const key = new HmacCryptoKey(sessionObject.toType<graphene.SecretKey>(), hmacAlg as HmacKeyAlgorithm);
    return key;
  }

  public async onExportKey(format: KeyFormat, key: HmacCryptoKey): Promise<JsonWebKey | ArrayBuffer> {
    const template = key.key.getAttribute({ value: null });
    switch (format.toLowerCase()) {
      case "jwk":
        const jwk: JsonWebKey = {
          kty: "oct",
          k: Convert.ToBase64Url(template.value),
          alg: `HS${key.algorithm.hash.name.replace("SHA-", "")}`,
          ext: true,
          key_ops: key.usages,
        };
        return jwk;
      case "raw":
        return new Uint8Array(template.value).buffer;
        break;
      default:
        throw new core.OperationError("format: Must be 'jwk' or 'raw'");
    }
  }

  public checkCryptoKey(key: CryptoKey, keyUsage?: KeyUsage) {
    super.checkCryptoKey(key, keyUsage);
    if (!(key instanceof HmacCryptoKey)) {
      throw new TypeError("key: Is not HMAC CryptoKey");
    }
  }

  protected createTemplate(alg: HmacKeyGenParams, extractable: boolean, keyUsages: KeyUsage[]): graphene.ITemplate {
    const id = utils.GUID(this.session.value);
    return {
      token: !!process.env.WEBCRYPTO_PKCS11_TOKEN,
      sensitive: !!process.env.WEBCRYPTO_PKCS11_SENSITIVE,
      class: graphene.ObjectClass.SECRET_KEY,
      keyType: graphene.KeyType.GENERIC_SECRET,
      label: `HMAC-${alg.length << 3}`,
      id,
      extractable,
      derive: false,
      sign: keyUsages.indexOf("sign") !== -1,
      verify: keyUsages.indexOf("verify") !== -1,
      encrypt: keyUsages.indexOf("encrypt") !== -1 || keyUsages.indexOf("wrapKey") !== -1,
      decrypt: keyUsages.indexOf("decrypt") !== -1 || keyUsages.indexOf("unwrapKey") !== -1,
      wrap: keyUsages.indexOf("wrapKey") !== -1,
      unwrap: keyUsages.indexOf("unwrapKey") !== -1,
    };
  }

  protected wc2pk11(alg: Algorithm, keyAlg: HmacKeyAlgorithm): graphene.IAlgorithm {
    let res: string;
    switch (keyAlg.hash.name.toUpperCase()) {
      case "SHA-1":
        res = "SHA_1_HMAC";
        break;
      case "SHA-224":
        res = "SHA224_HMAC";
        break;
      case "SHA-256":
        res = "SHA256_HMAC";
        break;
      case "SHA-384":
        res = "SHA384_HMAC";
        break;
      case "SHA-512":
        res = "SHA512_HMAC";
        break;
      default:
        throw new core.OperationError(`Cannot create PKCS11 mechanism from algorithm '${keyAlg.hash.name}'`);
    }
    return { name: res, params: null };
  }

}
