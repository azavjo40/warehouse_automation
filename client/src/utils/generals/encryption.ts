import NodeRSA from "node-rsa"
export const encryption = (data: any, privateKey: string) => {
  try {
    const encrypt = new NodeRSA(privateKey)
    const dataToString: string = JSON.stringify(data)
    const dataEncrypt: any = encrypt.encrypt(dataToString, "base64")
    return dataEncrypt
  } catch (e) {
    console.log(e)
  }
}
