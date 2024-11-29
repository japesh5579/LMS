import { useEffect } from 'react';

function About(){
    useEffect(()=>{
        document.title='About';
    });
    return(
        <h2>About Us</h2>
    )
};
export default About;
