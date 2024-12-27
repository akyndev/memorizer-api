import * as dns from "node:dns/promises"
import * as fs from "node:fs/promises"

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function isValidDomain(domain: string) {
  try {
   const mxRecords =  await dns.lookup(domain)
    console.log(mxRecords)
    return true
  } catch (error) {
    console.error(error)
  }
}

export async function verifySPF(domain: string) {
  try {
    const spf = await dns.resolveTxt(`${domain}`)
    const dmarc = await dns.resolveTxt(`_dmarc.${domain}`)

    await fs.appendFile(
      "/users/jossy/documents/meblastin/logs.txt",
      `${String(JSON.stringify(dmarc))} \n ------------------------- \n\n`,
      {
        encoding: "utf-8"
      }
    )

    console.log(dmarc)
    console.log(spf)

    if(dmarc && spf) return true
  } catch (error) {
    console.error(error)
  }
}
