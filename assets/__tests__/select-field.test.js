import { Browser } from 'happy-dom'

const browser = new Browser()
const page = browser.newPage()

await page.goto('https://github.com/capricorn86')
