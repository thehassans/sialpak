export default function Footer({ storeName }: { storeName: string }) {
  return (
    <footer className="bg-navy text-[#a9b6d3] pt-11 mt-10" id="footer">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-6 pb-8">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-xl text-white mb-3">
            Buy<span className="text-[#5ba0f5]">Sial</span>
          </div>
          <p className="text-[13px] leading-relaxed text-[#8b98b8]">Your everyday shopping destination for beauty, fashion, electronics and more — delivered fast, worldwide.</p>
        </div>
        <div>
          <h5 className="text-white font-extrabold text-sm mb-3.5">Shop</h5>
          <ul className="space-y-2 text-[13px]"><li>Best Offers</li><li>New Goods</li><li>Categories</li></ul>
        </div>
        <div>
          <h5 className="text-white font-extrabold text-sm mb-3.5">Support</h5>
          <ul className="space-y-2 text-[13px]"><li>Track Order</li><li>Delivery & Return</li><li>Contact Us</li></ul>
        </div>
        <div>
          <h5 className="text-white font-extrabold text-sm mb-3.5">Company</h5>
          <ul className="space-y-2 text-[13px]"><li>About Us</li><li>Careers</li><li>Privacy Policy</li></ul>
        </div>
        <div>
          <h5 className="text-white font-extrabold text-sm mb-3.5">Newsletter</h5>
          <p className="text-[13px]">Subscribe for deals and updates.</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-[12px]">
        © {new Date().getFullYear()} {storeName}. All rights reserved.
      </div>
    </footer>
  );
}
