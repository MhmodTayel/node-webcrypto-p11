import { Convert } from "pvtsutils";
import { crypto } from "./config";
import { isNSS, ITestGenerateKeyAction, testCrypto } from "./helper";

context("EC", () => {

  testCrypto(crypto, [
    // ECDSA
    {
      name: "ECDSA",
      actions: {
        generateKey: ["P-256", "P-384", "P-521", "K-256"].map((namedCurve) => {
          return {
            skip: namedCurve === "K-256" && isNSS("ECDSA-K256 GenerateKey throws CKR_DOMAIN_PARAMS_INVALID"),
            name: namedCurve,
            algorithm: {
              name: "ECDSA",
              namedCurve,
            } as EcKeyGenParams,
            extractable: false,
            keyUsages: ["sign", "verify"],
          } as ITestGenerateKeyAction;
        }),
        import: [
          {
            name: "JWK public key P-256",
            format: "jwk" as KeyFormat,
            data: {
              crv: "P-256",
              ext: true,
              key_ops: ["verify"],
              kty: "EC",
              x: "dJ9C3NyXDa3fMeZ477NWdp9W6faytA7A_U1ub-tyRcs",
              y: "aS0_VVe_SeIm8w5TBWjUEco7us6EJUMPKKJaIh36Lho",
            },
            algorithm: {
              name: "ECDSA",
              namedCurve: "P-256",
            } as EcKeyImportParams,
            extractable: true,
            keyUsages: ["verify"],
          },
          {
            name: "JWK public key P-384",
            format: "jwk" as KeyFormat,
            data: {
              crv: "P-384",
              ext: true,
              key_ops: ["verify"],
              kty: "EC",
              x: "eHlLZ4jnt_Drs-qoVxK-SZZvhNhi34jLCgyaEZ9XI6bdlK3y1ettm8K5SnLtDhWO",
              y: "qbr3pOOViYDQ2wWG-_9pwQ0S8cHV0LP-x9JO5dl-dsFYtbGix9YH7fRNOl8GkP-6",
            },
            algorithm: {
              name: "ECDSA",
              namedCurve: "P-384",
            } as EcKeyImportParams,
            extractable: true,
            keyUsages: ["verify"],
          },
          {
            name: "JWK public key P-521",
            format: "jwk" as KeyFormat,
            data: {
              crv: "P-521",
              ext: true,
              key_ops: ["verify"],
              kty: "EC",
              x: "Adqn62IVQX8LIauAXrUtxH05DHlRygKcsP9qWAnd9tfJvpaG7bzIs16WMEUe1V-f4AxbQJceU4xCP8dJppK_fzdC",
              y: "AEo3s1eExCOvpuBtBWnWlr7TuFhq_fMzqX9eqDHiy8qWl4I_koQtMePodrAc85mVrJAjvsa77Y3Ul3QtIWpXXBqa",
            },
            algorithm: {
              name: "ECDSA",
              namedCurve: "P-521",
            } as EcKeyImportParams,
            extractable: true,
            keyUsages: ["verify"],
          },
          //#region SPKI
          {
            name: "SPKI P-256",
            format: "spki" as KeyFormat,
            data: Convert.FromBase64("MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEoZMMqyfA16N6bvloFHmalk/SGMisr3zSXFZdR8F9UkaY7hF13hHiQtwp2YO+1zd7jwYi1Y7SMA9iUrC+ap2OCw=="),
            algorithm: {
              name: "ECDSA",
              namedCurve: "P-256",
            } as EcKeyImportParams,
            extractable: true,
            keyUsages: ["verify"],
          },
          {
            name: "SPKI P-384",
            format: "spki" as KeyFormat,
            data: Convert.FromBase64("MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAE8Kf5Wv21nksy0LuMlkMZv9sxTVAmzNWt81b6MVlYuzxl9D2/obwoVp86pTe4BM79gWWj8pfLc1XrjaIyMSrV8+05IejRLB3i4c0KTGA6QARGm3/AOm0MbTt6kMQF7drL"),
            algorithm: {
              name: "ECDSA",
              namedCurve: "P-384",
            } as EcKeyImportParams,
            extractable: true,
            keyUsages: ["verify"],
          },
          {
            name: "SPKI P-521",
            format: "spki" as KeyFormat,
            data: Convert.FromBase64("MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQB+/g37ii0T5iLHCAaXcYRRoNpT0LhfeAr88OwQY4cUpQm1S9lkR0EVUtyuYrYsMB8FarhAZYsLtOiyhjl/Y5f+lQAZ6veWILhbDcbrSNhTPSp3wamAm8QT3EjPUkJlYjHefuAUBIYS9pl5FWjK1pI9fkYe3bdAemkjP1ccHVzqZU9sjg="),
            algorithm: {
              name: "ECDSA",
              namedCurve: "P-521",
            } as EcKeyImportParams,
            extractable: true,
            keyUsages: ["verify"],
          },
          //#endregion
          //#region RAW
          {
            name: "RAW P-256",
            format: "raw" as KeyFormat,
            data: Convert.FromBase64("BEehen4AavxgJkx5EPZpBeopzgZuY+1i3cMR9iYdZj+IY7/h98Q/GboC2BKS6lT0hEyt6y1DFFXj8ytuof4zXR4="),
            algorithm: {
              name: "ECDSA",
              namedCurve: "P-256",
            } as EcKeyImportParams,
            extractable: true,
            keyUsages: ["verify"],
          },
          {
            name: "RAW P-384",
            format: "raw" as KeyFormat,
            data: Convert.FromBase64("BGYoCpP3Qv4o0s2GWg5xFnasdkI8h6K/LeBm4TV+9HCsqnoXFUJDM5SDeZ0rcCAUUuaPJVn5sedPEKEGW80zmLM1rBOG2RzaBq+uhEJkLpibongnzMZNX2LB58wGJ05f2g=="),
            algorithm: {
              name: "ECDSA",
              namedCurve: "P-384",
            } as EcKeyImportParams,
            extractable: true,
            keyUsages: ["verify"],
          },
          {
            name: "RAW P-521",
            format: "raw" as KeyFormat,
            data: Convert.FromBase64("BABIiZ3f90HQsl4CYHt7Q1WnOIOs+dxeecfQrew/z+73yI/bUrMlmR3mOVARtvg7ZPX7h3lSSqzA1Vv6iv7bPYekcwDKQPeLJkem//H7zY8xtKY+YrYnLUVv6vPE9jyk2vYkj8QPxQRdeIT5bzY2BzTiTcLHDwi2+w2Eonkt7M+zb4G6xw=="),
            algorithm: {
              name: "ECDSA",
              namedCurve: "P-521",
            } as EcKeyImportParams,
            extractable: true,
            keyUsages: ["verify"],
          },
          //#endregion
          //#region JWK Private key
          {
            name: "JWK private key P-256",
            format: "jwk" as KeyFormat,
            data: {
              crv: "P-256",
              d: "RIrfLaesGcEeNy7fOoVIkgMiImJOFw1Y44kdrtK_49I",
              ext: true,
              key_ops: ["sign"],
              kty: "EC",
              // WARN PKCS11 doesn't export public key from private key
              // x: "wJls5KwIfRDxJEvyAlo3G84qNY0HjvsujyxDSMYAlm4",
              // y: "I61bQbFgnzfDom68P86kRo98fTrV_9HLeqa4gYnGOdw",
            },
            algorithm: {
              name: "ECDSA",
              namedCurve: "P-256",
            } as EcKeyImportParams,
            extractable: true,
            keyUsages: ["sign"],
          },
          {
            name: "JWK private key P-384",
            format: "jwk" as KeyFormat,
            data: {
              crv: "P-384",
              d: "4YQRcOD-4LMLEr-qsRhQ1oq8hfPKa66BfGVUv3LUlsf2OU3aFG5FxabG5xFUoAE2",
              ext: true,
              key_ops: ["sign"],
              kty: "EC",
              // WARN PKCS11 doesn't export public key from private key
              // x: "XKewC5QCVW9w-SFyZd3z1vlmCqbYYuJmoGRzKtjwkpYQD_RhNAc3ck29d_t0QmaT",
              // y: "6oSrri3ry1_8c2NKM8aiaJcjwd146ITViezQ7-BpsE1-wDH18P1QkbmR3-Ho54We",
            },
            algorithm: {
              name: "ECDSA",
              namedCurve: "P-384",
            } as EcKeyImportParams,
            extractable: true,
            keyUsages: ["sign"],
          },
          {
            name: "JWK private key P-521",
            format: "jwk" as KeyFormat,
            data: {
              crv: "P-521",
              d: "AItxxufCXVzwPVePNe9Acy8HfbmYeUVkiEyFXdsYRnHxqgDpwucVnIJ44-ZWRpuWu5Ep5KVV3vY9Hp8nJfksi7z2",
              ext: true,
              key_ops: ["sign"],
              kty: "EC",
              // WARN PKCS11 doesn't export public key from private key
              // x: "AJGuTezC-8F-d_0bBpS502OK0z63vo87Dw99a3NUm6gm5pQC1rwu7LcblGqFWOuFBZhsF8I6OFjYvsR-z3u7hhCA",
              // y: "AFQT8BB9hBf7UwwBUV4im8bFJ7_MD0qOZMVetmdbooMjfec1q3wU5cSoy4LvCnWAaFqu5havUxwnAUuPUWGG_InR",
            },
            algorithm: {
              name: "ECDSA",
              namedCurve: "P-521",
            } as EcKeyImportParams,
            extractable: true,
            keyUsages: ["sign"],
          },
          //#endregion
          //#region PKCS8
          {
            name: "PKCS8 P-256",
            format: "pkcs8" as KeyFormat,
            data: Convert.FromHex("304d020100301306072a8648ce3d020106082a8648ce3d030107043330310201010420895118e4e168dc9ee0d419d2c3f5845b2918fda96b84d9a91012f2ffb70d9ee1a00a06082a8648ce3d030107"),
            algorithm: {
              name: "ECDSA",
              namedCurve: "P-256",
            } as EcKeyImportParams,
            extractable: true,
            keyUsages: ["sign"],
          },
          {
            name: "PKCS8 P-384",
            format: "pkcs8" as KeyFormat,
            data: Convert.FromHex("3057020100301006072a8648ce3d020106052b810400220440303e020101043098d7c6a318f0a02efe1a17552492884c11a079314d4cc9f92e1504905436072d61539fc7fd73371eeda4c80e3902c743a00706052b81040022"),
            algorithm: {
              name: "ECDSA",
              namedCurve: "P-384",
            } as EcKeyImportParams,
            extractable: true,
            keyUsages: ["sign"],
          },
          {
            name: "PKCS8 P-521",
            format: "pkcs8" as KeyFormat,
            data: Convert.FromHex("3069020100301006072a8648ce3d020106052b81040023045230500201010442006c71a419f8a4e6ad25f99308ef475ba5319678acb5f9cde61bdf301e69e953e7766c0adc603397728aa0e4873fa679ad1efc6693e125df7bb75e880638d28f968ba00706052b81040023"),
            algorithm: {
              name: "ECDSA",
              namedCurve: "P-521",
            } as EcKeyImportParams,
            extractable: true,
            keyUsages: ["sign"],
          },
          //#endregion
        ],
        sign: [
          {
            name: "ECDSA-P256",
            key: {
              privateKey: {
                format: "pkcs8" as KeyFormat,
                data: Convert.FromBase64("MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgsY5TBHM+9mLXGpFaPmrigl6+jl0XWzazxu1lbwb5KRahRANCAATqDP2L/xxSOlckG+j6oPHfzBE4WpmjA/YE9sP2rXpXW1qe9I/GJ7wjlOTXpqHUxQeBbps8jSvV+A7DzQqzjOst"),
                algorithm: {
                  name: "ECDSA",
                  namedCurve: "P-256",
                } as EcKeyImportParams,
                extractable: true,
                keyUsages: ["sign"],
              },
              publicKey: {
                format: "spki" as KeyFormat,
                data: Convert.FromBase64("MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE6gz9i/8cUjpXJBvo+qDx38wROFqZowP2BPbD9q16V1tanvSPxie8I5Tk16ah1MUHgW6bPI0r1fgOw80Ks4zrLQ=="),
                algorithm: {
                  name: "ECDSA",
                  namedCurve: "P-256",
                } as EcKeyImportParams,
                extractable: true,
                keyUsages: ["verify"],
              },
            },
            data: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]),
            signature: Convert.FromBase64("gsTh0IcWfzj3hjjourRgzTIsNa+wcDEDlKnkEA4Jv8ygLF2IDIOXpCD7ocCGo7xlSMGTme78CyrPqWGSz95mZg=="),
            algorithm: {
              name: "ECDSA",
              hash: "SHA-256",
            } as EcdsaParams,
          },
          {
            skip: isNSS("ECDSA-K256 Sign/Verify throws CKR_DOMAIN_PARAMS_INVALID"),
            name: "ECDSA-K256",
            key: {
              privateKey: {
                format: "pkcs8" as KeyFormat,
                data: Convert.FromBase64("MIGEAgEAMBAGByqGSM49AgEGBSuBBAAKBG0wawIBAQQg0h6+W+/4eFVP+i79hrzYeiEJ6UrveFYhuhoXRW+g/LGhRANCAASiJU6MaFN5fshUv6X5rCf/RjLQ0nAXj06gBdo3ruYiKZf8daAcYImniAq81PjF0j6eTwCy4bYbkyfBQtrtCTKR"),
                algorithm: {
                  name: "ECDSA",
                  namedCurve: "K-256",
                } as EcKeyImportParams,
                extractable: true,
                keyUsages: ["sign"],
              },
              publicKey: {
                format: "spki" as KeyFormat,
                data: Convert.FromBase64("MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEoiVOjGhTeX7IVL+l+awn/0Yy0NJwF49OoAXaN67mIimX/HWgHGCJp4gKvNT4xdI+nk8AsuG2G5MnwULa7QkykQ=="),
                algorithm: {
                  name: "ECDSA",
                  namedCurve: "K-256",
                } as EcKeyImportParams,
                extractable: true,
                keyUsages: ["verify"],
              },
            },
            data: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]),
            signature: Convert.FromBase64("lqUTZHqf9v9KcOCw5r5wR1sCt9RPA0ONVW6vqejpoALehd6vtAb+ybVrDEtyUDpBFw9UIRIW6GnXRrAz4KaO4Q=="),
            algorithm: {
              name: "ECDSA",
              hash: "SHA-256",
            } as EcdsaParams,
          },
        ],
      },
    },
    // ECDH
    {
      name: "ECDH",
      actions: {
        deriveBits: [
          {
            name: "P-256 128",
            key: {
              privateKey: {
                format: "pkcs8" as KeyFormat,
                data: Convert.FromBase64("MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgQA7bkTNYlIYVb9+DavBlJ3b08f0892or3XwfscA3tLGhRANCAARzsy+ZcbrNchF7SrpL0hYnGp6ICX77jXUrpMYkq0BuzfaPFWcu9YZH5ASUzQJGz9eCK3mDXEbLCuiHRw3dwkFs"),
                algorithm: {
                  name: "ECDH",
                  namedCurve: "P-256",
                } as EcKeyImportParams,
                extractable: true,
                keyUsages: ["deriveBits"],
              },
              publicKey: {
                format: "spki" as KeyFormat,
                data: Convert.FromBase64("MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEc7MvmXG6zXIRe0q6S9IWJxqeiAl++411K6TGJKtAbs32jxVnLvWGR+QElM0CRs/Xgit5g1xGywroh0cN3cJBbA=="),
                algorithm: {
                  name: "ECDH",
                  namedCurve: "P-256",
                } as EcKeyImportParams,
                extractable: true,
                keyUsages: [],
              },
            },
            data: Convert.FromBase64("Jlc1/Zqi/8mH1oQT8+YfCA=="),
            algorithm: {
              name: "ECDH",
            },
            length: 128,
          },
          {
            name: "P-384 192",
            key: {
              privateKey: {
                format: "pkcs8" as KeyFormat,
                data: Convert.FromBase64("MIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDAFOXcWxQ+YqPdUqc9Iar3ZDf012ZtQAFajBMApKpd2WPQccBmyPzvDZJSWKe3d5jShZANiAAQ4Z43bP7d5fUFIBorLA1pBFTwDLb6XA7J871VUwyu64q8L5qidV7iBZK3P+9m7eMMQWm0drWPvrEszE+4jEsS4HIbBeuduBU+6R46Orv+V6VXU1hAXKSdMFZOCzdbDFlE="),
                algorithm: {
                  name: "ECDH",
                  namedCurve: "P-384",
                } as EcKeyImportParams,
                extractable: true,
                keyUsages: ["deriveBits"],
              },
              publicKey: {
                format: "spki" as KeyFormat,
                data: Convert.FromBase64("MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEOGeN2z+3eX1BSAaKywNaQRU8Ay2+lwOyfO9VVMMruuKvC+aonVe4gWStz/vZu3jDEFptHa1j76xLMxPuIxLEuByGwXrnbgVPukeOjq7/lelV1NYQFyknTBWTgs3WwxZR"),
                algorithm: {
                  name: "ECDH",
                  namedCurve: "P-384",
                } as EcKeyImportParams,
                extractable: true,
                keyUsages: [],
              },
            },
            data: Convert.FromBase64("2EKT/nmV68wIXFMZiCv4CyOEhWzpwdQ5"),
            algorithm: {
              name: "ECDH",
            },
            length: 192,
          },
          {
            name: "P-521 256",
            key: {
              privateKey: {
                format: "pkcs8" as KeyFormat,
                data: Convert.FromBase64("MIHuAgEAMBAGByqGSM49AgEGBSuBBAAjBIHWMIHTAgEBBEIB6PyCXpJ4TWPpwlGAmayLz5ecYHT+1ilxD64HytpTaViUS72sEzG1JMApD31+STX0zeVcARfG+yh71dXLCTlqqHGhgYkDgYYABADgIblBbth8vnOZt/HLU9VdUJHmenwRRADVZWL+P5IeCDQs6B87API41R3+91xFDHnjst9VKksYl/NJIIfl6b9cmABO6z80mTz3+0klquIpSQLidK2aFaFbqiGnMdCO+AZfwxu2qBx+1f5MwbHXUW5HXsfmEvzBUC9xCQKLpQ8oZYBrSg=="),
                algorithm: {
                  name: "ECDH",
                  namedCurve: "P-521",
                } as EcKeyImportParams,
                extractable: true,
                keyUsages: ["deriveBits"],
              },
              publicKey: {
                format: "spki" as KeyFormat,
                data: Convert.FromBase64("MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQA4CG5QW7YfL5zmbfxy1PVXVCR5np8EUQA1WVi/j+SHgg0LOgfOwDyONUd/vdcRQx547LfVSpLGJfzSSCH5em/XJgATus/NJk89/tJJariKUkC4nStmhWhW6ohpzHQjvgGX8MbtqgcftX+TMGx11FuR17H5hL8wVAvcQkCi6UPKGWAa0o="),
                algorithm: {
                  name: "ECDH",
                  namedCurve: "P-521",
                } as EcKeyImportParams,
                extractable: true,
                keyUsages: [],
              },
            },
            data: Convert.FromBase64("AS2ene28pmWYdJwW6dyTXUe1eq1p2i8QEIo/rXSiJRo="),
            algorithm: {
              name: "ECDH",
            },
            length: 256,
          },
          {
            skip: isNSS("ECDH-K256 DeriveBits throws CKR_DOMAIN_PARAMS_INVALID"),
            name: "K-256 128",
            key: {
              privateKey: {
                format: "pkcs8" as KeyFormat,
                data: Convert.FromBase64("MIGEAgEAMBAGByqGSM49AgEGBSuBBAAKBG0wawIBAQQghgLhhrz/EYuB0G08/UoM5nV9jS7Pl/rtIcXeJkc2b3uhRANCAARgMfEiAPcF7pmEuLRGRRFXEKSwcJwqURKK/Pqo8MaqU0cl7eNQmLJ7mFpBtTDY8hr9xxJeIP9sI/u83A1F5ag7"),
                algorithm: {
                  name: "ECDH",
                  namedCurve: "K-256",
                } as EcKeyImportParams,
                extractable: true,
                keyUsages: ["deriveBits"],
              },
              publicKey: {
                format: "spki" as KeyFormat,
                data: Convert.FromBase64("MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEYDHxIgD3Be6ZhLi0RkURVxCksHCcKlESivz6qPDGqlNHJe3jUJiye5haQbUw2PIa/ccSXiD/bCP7vNwNReWoOw=="),
                algorithm: {
                  name: "ECDH",
                  namedCurve: "K-256",
                } as EcKeyImportParams,
                extractable: true,
                keyUsages: [],
              },
            },
            data: Convert.FromBase64("3+2JX3D4/veBGJXnvU+aTg=="),
            algorithm: {
              name: "ECDH",
            },
            length: 128,
          },
        ],
        deriveKey: [
          {
            name: "P-256 128",
            key: {
              privateKey: {
                format: "pkcs8" as KeyFormat,
                data: Convert.FromBase64("MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgQA7bkTNYlIYVb9+DavBlJ3b08f0892or3XwfscA3tLGhRANCAARzsy+ZcbrNchF7SrpL0hYnGp6ICX77jXUrpMYkq0BuzfaPFWcu9YZH5ASUzQJGz9eCK3mDXEbLCuiHRw3dwkFs"),
                algorithm: {
                  name: "ECDH",
                  namedCurve: "P-256",
                } as EcKeyImportParams,
                extractable: true,
                keyUsages: ["deriveKey"],
              },
              publicKey: {
                format: "spki" as KeyFormat,
                data: Convert.FromBase64("MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEc7MvmXG6zXIRe0q6S9IWJxqeiAl++411K6TGJKtAbs32jxVnLvWGR+QElM0CRs/Xgit5g1xGywroh0cN3cJBbA=="),
                algorithm: {
                  name: "ECDH",
                  namedCurve: "P-256",
                } as EcKeyImportParams,
                extractable: true,
                keyUsages: [],
              },
            },
            algorithm: {
              name: "ECDH",
            },
            derivedKeyType: {
              name: "AES-CBC",
              length: 128,
            } as AesKeyAlgorithm,
            keyUsages: ["encrypt", "decrypt"],
            format: "raw",
            keyData: Convert.FromBase64("Jlc1/Zqi/8mH1oQT8+YfCA=="),
          },
          {
            name: "P-384 192",
            key: {
              privateKey: {
                format: "pkcs8" as KeyFormat,
                data: Convert.FromBase64("MIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDAFOXcWxQ+YqPdUqc9Iar3ZDf012ZtQAFajBMApKpd2WPQccBmyPzvDZJSWKe3d5jShZANiAAQ4Z43bP7d5fUFIBorLA1pBFTwDLb6XA7J871VUwyu64q8L5qidV7iBZK3P+9m7eMMQWm0drWPvrEszE+4jEsS4HIbBeuduBU+6R46Orv+V6VXU1hAXKSdMFZOCzdbDFlE="),
                algorithm: {
                  name: "ECDH",
                  namedCurve: "P-384",
                } as EcKeyImportParams,
                extractable: true,
                keyUsages: ["deriveKey"],
              },
              publicKey: {
                format: "spki" as KeyFormat,
                data: Convert.FromBase64("MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEOGeN2z+3eX1BSAaKywNaQRU8Ay2+lwOyfO9VVMMruuKvC+aonVe4gWStz/vZu3jDEFptHa1j76xLMxPuIxLEuByGwXrnbgVPukeOjq7/lelV1NYQFyknTBWTgs3WwxZR"),
                algorithm: {
                  name: "ECDH",
                  namedCurve: "P-384",
                } as EcKeyImportParams,
                extractable: true,
                keyUsages: [],
              },
            },
            algorithm: {
              name: "ECDH",
            },
            derivedKeyType: {
              name: "AES-GCM",
              length: 192,
            } as AesKeyAlgorithm,
            keyUsages: ["encrypt", "decrypt"],
            format: "raw",
            keyData: Convert.FromBase64("2EKT/nmV68wIXFMZiCv4CyOEhWzpwdQ5"),
          },
          {
            name: "P-521 256",
            key: {
              privateKey: {
                format: "pkcs8" as KeyFormat,
                data: Convert.FromBase64("MIHuAgEAMBAGByqGSM49AgEGBSuBBAAjBIHWMIHTAgEBBEIB6PyCXpJ4TWPpwlGAmayLz5ecYHT+1ilxD64HytpTaViUS72sEzG1JMApD31+STX0zeVcARfG+yh71dXLCTlqqHGhgYkDgYYABADgIblBbth8vnOZt/HLU9VdUJHmenwRRADVZWL+P5IeCDQs6B87API41R3+91xFDHnjst9VKksYl/NJIIfl6b9cmABO6z80mTz3+0klquIpSQLidK2aFaFbqiGnMdCO+AZfwxu2qBx+1f5MwbHXUW5HXsfmEvzBUC9xCQKLpQ8oZYBrSg=="),
                algorithm: {
                  name: "ECDH",
                  namedCurve: "P-521",
                } as EcKeyImportParams,
                extractable: true,
                keyUsages: ["deriveKey"],
              },
              publicKey: {
                format: "spki" as KeyFormat,
                data: Convert.FromBase64("MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQA4CG5QW7YfL5zmbfxy1PVXVCR5np8EUQA1WVi/j+SHgg0LOgfOwDyONUd/vdcRQx547LfVSpLGJfzSSCH5em/XJgATus/NJk89/tJJariKUkC4nStmhWhW6ohpzHQjvgGX8MbtqgcftX+TMGx11FuR17H5hL8wVAvcQkCi6UPKGWAa0o="),
                algorithm: {
                  name: "ECDH",
                  namedCurve: "P-521",
                } as EcKeyImportParams,
                extractable: true,
                keyUsages: [],
              },
            },
            algorithm: {
              name: "ECDH",
            },
            derivedKeyType: {
              name: "AES-CBC",
              length: 256,
            } as AesKeyAlgorithm,
            keyUsages: ["encrypt", "decrypt"],
            format: "raw",
            keyData: Convert.FromBase64("AS2ene28pmWYdJwW6dyTXUe1eq1p2i8QEIo/rXSiJRo="),
          },
        ],
      },
    },
  ]);

});
