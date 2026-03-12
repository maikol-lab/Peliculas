import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
      <div className="container py-5">
        <div className="row g-4 rounded mb-5" style={{ background: 'rgba(255, 255, 255, .03)' }}>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="rounded p-4">
              <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-4" style={{ width: 70, height: 70 }}>
                <i className="fas fa-map-marker-alt fa-2x text-primary" />
              </div>
              <div>
                <h4 className="text-white">Address</h4>
                <p className="mb-2">123 Street New York.USA</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="rounded p-4">
              <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-4" style={{ width: 70, height: 70 }}>
                <i className="fas fa-envelope fa-2x text-primary" />
              </div>
              <div>
                <h4 className="text-white">Mail Us</h4>
                <p className="mb-2">info@example.com</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="rounded p-4">
              <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-4" style={{ width: 70, height: 70 }}>
                <i className="fa fa-phone-alt fa-2x text-primary" />
              </div>
              <div>
                <h4 className="text-white">Telephone</h4>
                <p className="mb-2">(+012) 3456 7890</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="rounded p-4">
              <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-4" style={{ width: 70, height: 70 }}>
                <i className="fab fa-firefox-browser fa-2x text-primary" />
              </div>
              <div>
                <h4 className="text-white">Yoursite@ex.com</h4>
                <p className="mb-2">(+012) 3456 7890</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-5">
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="footer-item d-flex flex-column">
              <div className="footer-item">
                <h4 className="text-primary mb-4">Newsletter</h4>
                <p className="mb-3">Dolor amet sit justo amet elitr clita ipsum elitr est.Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit consectetur adipiscing elit.</p>
                <div className="position-relative mx-auto rounded-pill">
                  <input className="form-control rounded-pill w-100 py-3 ps-4 pe-5" type="text" placeholder="Enter your email" />
                  <button type="button" className="btn btn-primary rounded-pill position-absolute top-0 end-0 py-2 mt-2 me-2">SignUp</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="footer-item d-flex flex-column">
              <h4 className="text-primary mb-4">Customer Service</h4>
              <a href="#" className><i className="fas fa-angle-right me-2" /> Contact Us</a>
              <a href="#" className><i className="fas fa-angle-right me-2" /> Returns</a>
              <a href="#" className><i className="fas fa-angle-right me-2" /> Order History</a>
              <a href="#" className><i className="fas fa-angle-right me-2" /> Site Map</a>
              <a href="#" className><i className="fas fa-angle-right me-2" /> Testimonials</a>
              <a href="#" className><i className="fas fa-angle-right me-2" /> My Account</a>
              <a href="#" className><i className="fas fa-angle-right me-2" /> Unsubscribe Notification</a>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="footer-item d-flex flex-column">
              <h4 className="text-primary mb-4">Information</h4>
              <a href="#" className><i className="fas fa-angle-right me-2" /> About Us</a>
              <a href="#" className><i className="fas fa-angle-right me-2" /> Delivery infomation</a>
              <a href="#" className><i className="fas fa-angle-right me-2" /> Privacy Policy</a>
              <a href="#" className><i className="fas fa-angle-right me-2" /> Terms &amp; Conditions</a>
              <a href="#" className><i className="fas fa-angle-right me-2" /> Warranty</a>
              <a href="#" className><i className="fas fa-angle-right me-2" /> FAQ</a>
              <a href="#" className><i className="fas fa-angle-right me-2" /> Seller Login</a>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="footer-item d-flex flex-column">
              <h4 className="text-primary mb-4">Extras</h4>
              <a href="#" className><i className="fas fa-angle-right me-2" /> Brands</a>
              <a href="#" className><i className="fas fa-angle-right me-2" /> Gift Vouchers</a>
              <a href="#" className><i className="fas fa-angle-right me-2" /> Affiliates</a>
              <a href="#" className><i className="fas fa-angle-right me-2" /> Wishlist</a>
              <a href="#" className><i className="fas fa-angle-right me-2" /> Order History</a>
              <a href="#" className><i className="fas fa-angle-right me-2" /> Track Your Order</a>
              <a href="#" className><i className="fas fa-angle-right me-2" /> Track Your Order</a>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Footer;
