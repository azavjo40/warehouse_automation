import NodeRSA from "node-rsa"
export const decryption = (data: any, privateKey: string) => {
  try {
    const decrypte = new NodeRSA(privateKey)
    const decryptData = decrypte.decrypt(data, "utf8")
    const decryptDataToParse: any = JSON.parse(decryptData)
    return decryptDataToParse
  } catch (e) {
    console.log(e)
  }
}
