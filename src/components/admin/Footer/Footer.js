import React from 'react';
import { Container, Row } from 'reactstrap';
// used for making the prop types of this component
import PropTypes from 'prop-types';
const Footer = (props) => {
    return (
        <footer className={'footer'}>
            <Container fluid={props.fluid ? true : false}>
                <Row>
                    <nav className='footer-nav'>
                        <ul>
                            <li>
                                <a href='https://www.creative-tim.com' target='_blank'>
                                    NTMovies
                                </a>
                            </li>
                            <li>
                                <a href='https://blog.creative-tim.com' target='_blank'>
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href='https://www.creative-tim.com/license' target='_blank'>
                                    Licenses
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className='credits ml-auto'>
                        <div className='copyright'>
                            &copy; {1900 + new Date().getYear()}, made with <i className='fa fa-heart heart' /> by
                            NTMovies
                        </div>
                    </div>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;