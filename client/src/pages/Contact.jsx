import { Separator } from "@radix-ui/themes"

export default function Contact() {
  return (
    <div class="w-screen h-[88vh] flex items-center justify-center max-lg:h-full max-lg:mb-32 max-lg:mt-4">
    <div class="w-full h-fit flex flex-col items-center justify-center gap-4">
      <div class="flex flex-col">
        <img src="./qr.png" className="object-contain h-64"/>
        <h3 className="text-sm font-semibold">Scan this qr code to go to our Whatsapp</h3>
      </div>
        <h1>You can also reach out via:</h1>
      <div class="flex flex-col items-center gap-10  w-max">
        <div class="addresses flex flex-col items-center justify-start gap-1">
          <h3 className="font-bold">Socials</h3>
          <div className='flex gap-2'>
            <a href="https://www.facebook.com/people/Gujarat-Sales-Surat/100067636183843/" target='_blank'><img src="./facebook.svg" alt="" role="button" className="w-8"/></a>
            <a href="https://www.instagram.com/gujarat_sales_surat/" target='_blank'><img src="./instagram.svg" alt="" role="button" className="w-8"/></a>
            <a href="https://api.whatsapp.com/send?phone=919825025769&text=Hello%20Gujarat%20Sales!" target='_blank'><img src="./whatsapp.svg" alt="" role="button" className="w-8"/></a>
          </div>
        </div>
        <div className="flex gap-12 max-lg:flex-col">
        <div class="flex items-center flex-col">
          <h3 className="font-bold">Phone</h3>
          <p>
          +91 98250 25769
          </p>
        </div>
        <Separator orientation="vertical" size="3" className="max-lg:hidden"/>
        <div class="flex items-center flex-col">
          <h3 className="font-bold">Email</h3>
          <p>gujaratsales@gmail.com</p>
        </div>
        <Separator orientation="vertical" size="3" className="max-lg:hidden"/>

        <div class="flex items-center flex-col w-56 text-justify">
          <h3 className="font-bold">Address</h3>
          <p>B 5, Rustam Park, Maruti Nagar Chowk, Surat, , Surat- 394210, Gujarat, India</p>
        </div>
        </div>
      </div>
    </div>
  </div>
  )
}
