function Footer() {
    return (
        <footer className="footer">
          <div className="footerTop">
            <div className="footerBrand">
              <div className="footerBrandHeader">
                <img src="/img/logo.png" alt="TOP Sneakers logo" width={40} height={40} />
                <div>
                  <h3>TOP Sneakers</h3>
                  <p>Shop for the best sneakers</p>
                </div>
              </div>
              <p className="footerBrandText">
                Fast shipping across Germany and the EU. Easy returns within 30 days.
              </p>
            </div>

            <div className="footerCols">
              <div className="footerCol">
                <h4>Customer service</h4>
                <ul>
                  <li>Shipping & Delivery</li>
                  <li>Payment Methods</li>
                  <li>Returns & Refunds</li>
                  <li>Size Guide</li>
                  <li>FAQ</li>
                </ul>
              </div>

              <div className="footerCol">
                <h4>Contact</h4>
                <ul>
                  <li>support@topsneakers.de</li>
                  <li>+49 (0)30 1234 5678</li>
                  <li>Mon–Fri, 10:00–18:00 (CET)</li>
                  <li>Munich, Germany</li>
                </ul>
              </div>

              <div className="footerCol">
                <h4>Legal</h4>
                <ul>
                  <li>Privacy Policy</li>
                  <li>Terms & Conditions</li>
                  <li>Cookie Settings</li>
                  <li>Imprint (Impressum)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footerBottom">
            <span>© {new Date().getFullYear()} TOP Sneakers. All rights reserved.</span>
            <span>Prices incl. VAT where applicable.</span>
          </div>
      </footer>
    )
}

export default Footer;