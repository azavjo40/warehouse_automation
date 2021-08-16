import { RECEIPTPDF, DISPATCHPDF } from "../../constants/index"
export const storagePdf = (): any => {
  const getPdf = JSON.parse(localStorage.getItem(RECEIPTPDF) as any)
  const postPdf = JSON.parse(localStorage.getItem(DISPATCHPDF) as any)
  return { getPdf, postPdf }
}
