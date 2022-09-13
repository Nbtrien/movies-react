import React from 'react';
import logo from '../../../assets/log3.png';
import './footer.scss';

function Footer() {
    return (
        <div id='footer'>
            <footer>
                <div className='d_footer'>
                    <div className='content'>
                        <div className='footer-grids'>
                            <div className='footer one'>
                                <img src={logo} />
                                <p>“It is not our abilities that show what we truly are… it is our choices”.</p>
                                <p className='adam'>Harry Hotter and The chamber of secrets, 2002</p>
                                <div className='clear'></div>
                            </div>
                            <div className='footer two'>
                                <h3>Theo dõi chúng tôi</h3>
                                <ul>
                                    <li>
                                        <a className='fb' href='https://www.facebook.com/trien.nguyen.397948'>
                                            <i></i>Trên Facebook
                                        </a>
                                    </li>
                                    <li>
                                        <a className='fb1' href='https://twitter.com/TrienNguyen17'>
                                            <i></i>Trên Twitter
                                        </a>
                                    </li>
                                    <li>
                                        <a className='fb2' href='#'>
                                            <i></i>Trên Google Plus
                                        </a>
                                    </li>
                                    <li>
                                        <a className='fb3' href='https://www.instagram.com/trien___/?hl=vi'>
                                            <i></i>Trên Instagram
                                        </a>
                                    </li>
                                    <li>
                                        <a className='fb4' href='https://www.pinterest.com/nguyenanchi1919'>
                                            <i></i>Trên Pinterest
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className='footer three'>
                                <h3>Thông tin liên lạc</h3>
                                <ul>
                                    <li>
                                        AC Phim.com <span>Ngũ Hành Sơn, Đà Nẵng, Việt Nam</span>
                                    </li>
                                    <li>0123456789</li>
                                    <li>
                                        <a href='trienbanguyen@gmail.com'>trienbanguyen@gmail.com</a>{' '}
                                    </li>
                                </ul>
                            </div>
                            <div className='clear'></div>
                        </div>
                        <div className='copy-right-grids'>
                            <div className='copy-left'>
                                <p className='footer-gd'>© Bản quyền thuộc về tao</p>
                            </div>
                            <div className='copy-right'>
                                <ul>
                                    <li>
                                        <a href='#'>Thông tin về chúng tôi</a>
                                    </li>
                                    <li>
                                        <a href='#'>Chính sách bảo mật</a>
                                    </li>
                                    <li>
                                        <a href='#'>Điều khoản sử dụng</a>
                                    </li>
                                </ul>
                            </div>
                            <div className='clear'></div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
