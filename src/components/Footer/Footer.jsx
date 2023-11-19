import React from 'react';
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';
import {Github, Instagram, Linkedin} from "react-bootstrap-icons";

const Footer = () => {
    return (
        <MDBFooter className='bg-dark text-center text-white mt-5'>
            <MDBContainer className='p-4 pb-0'>
                <div className="mb-4 gap-5">
                    <a href="https://www.instagram.com/maryush_p/" target="_blank" rel="noopener noreferrer" className="text-white">
                        <Instagram size={35}/>
                    </a>

                    <a href="https://www.linkedin.com/in/maryush-padhol/" target="_blank" rel="noopener noreferrer" className="text-white">
                        <Linkedin size={32} className="mx-5"/>
                    </a>

                    <a href="https://github.com/maryushp" target="_blank" rel="noopener noreferrer" className="text-white">
                        <Github size={35}/>
                    </a>

                </div>
            </MDBContainer>

            <h4>
                Game Keys: Where Gaming Dreams Begin!
            </h4>
            <div className='text-center p-3' style={{ backgroundColor: 'rgb(33,37,41)' }}>
                © 2023 Copyright:
                <a className='text-white px-2' href='https://github.com/maryushp'>
                    Maryush Padhol
                </a>
            </div>
        </MDBFooter>
    );
};
export default Footer;