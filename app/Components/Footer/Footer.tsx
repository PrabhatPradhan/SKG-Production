 
import "../Hero/hero.css"
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
export default function Footer() {
  return (
    <>
     <footer suppressHydrationWarning   className="footer">
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="footer-grid">
              <div>
                <div className="footer-brand">SKG</div>
                <div className="footer-tagline">
                  A premier photography studio based in Delhi, crafting timeless visuals for portraits, weddings, fashion and commercial projects.
                </div>
               <div className="footer-socials" style={{ marginTop: 24 }}>
  {[FaInstagram, FaFacebookF, FaTwitter, FaYoutube].map((Icon, i) => (
    <a key={i} href="#" className="footer-social">
      <Icon />
    </a>
  ))}
</div>
              </div>
              <div>
                <div className="footer-col-title">Services</div>
                {["Portrait","Wedding","Fashion","Commercial","Events"].map(s => (
                  <a key={s} href="#" className="footer-link">{s}</a>
                ))}
              </div>
              <div>
                <div className="footer-col-title">Models</div>
                {["Man","Woman","Child","Portfolio","Casting"].map(s => (
                  <a key={s} href="#" className="footer-link">{s}</a>
                ))}
              </div>
              <div>
                <div className="footer-col-title">Studio</div>
                {["About Us","Portfolio","Contact","Book Now","FAQ"].map(s => (
                  <a key={s} href="#" className="footer-link">{s}</a>
                ))}
              </div>
            </div>
            <div className="footer-bottom">
              <div className="footer-copy">© 2025 SKG Production. All rights reserved.</div>
              <div className="footer-copy">Delhi, India</div>
            </div>
          </div>
        </footer>
    </>
  )
}
