import CryptoJS from "crypto-js";
import "./CSS/Home.css";
import { useState } from "react/cjs/react.development";

const Home = ()=>{
    function encryptByDES(message, key) {

        var keyHex = CryptoJS.enc.Utf8.parse(key);

        var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        return encrypted.toString();
    }
    
    function decryptByDES(ciphertext, key) {
        var keyHex = CryptoJS.enc.Utf8.parse(key);
    
        // direct decrypt ciphertext
        var decrypted = CryptoJS.DES.decrypt({
            ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
        }, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
    
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
    
    var message = 'Message';
    var key = '38346591';
    
    var ciphertext = "ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDyF5QrvLtDHxpLnF8+OVU91+d5uIMVD1F2lyRnvX+kiQnX/yrCF3lJThw7tS9a8Gtq";
    console.info('ciphertext:', ciphertext);
    
    var plaintext = decryptByDES(ciphertext, key);

    console.info('plaintext :', plaintext);

    const calculate = ()=>{
        
    }

    const [isModeEnc,setisModeEnc] = useState(true);
    const [cypherkey,setcypherKey] = useState("");
    const [plaintext,setPlaintext] = useState("");

    return(
        <div className="content">
        
        <div className="center">
            <div className="function">
                <div className="enc toogle" onClick={()=>{setisModeEnc(true)}} style={{backgroundColor:isModeEnc?"white":"black"}}>
                    <p className="fun_type">
                        Encrypt
                    </p>
                </div>
                <div className="dec toogle" onClick={()=>{setisModeEnc(false)}} style={{backgroundColor:isModeEnc?"black":"white"}}>
                    <p className="fun_type">
                        Decrypt
                    </p>
                </div>
            </div>
        </div>
        
        <div className="center">

            <div className="prop_sel">

                <div className="mode_sel">
                    <label for="mode" className="sel_label">Choose a Mode</label>
                    <select name="mode" id="mode">
                    <option value="ECB">ECB</option>
                    <option value="CBC">CBC</option>
                    <option value="CTR">CTR</option>
                    <option value="OFB">OFB</option>
                    <option value="CFB">CFB</option>
                    </select>
                </div>

                <div className="padd_sel">
                    <label for="padd" className="sel_label">Select Padding</label>
                    <select name="padd" id="padd">
                    <option value="PKCS7">PKCS7</option>
                    <option value="ZERO">ZERO</option>
                    <option value="ISO10126">ISO10126</option>
                    <option value="ANSIX923">ANSIX923</option>
                    <option value="NONE">NONE</option>
                    </select>
                </div>

            </div>
            
        </div>
        
        <div className="center">
            <div className="inputs">
                <label htmlFor="key">Key</label>
                <input type="text" name="key" className="key_tb inp_txt" />
                <label htmlFor="plaintext">Plaintext</label>
                <textarea name="plaintext" className="plain_tb inp_txt">
                </textarea>

                <button className="submit_btn" onClick={calculate}>Submit</button>
            </div>
            
        </div>
        
        {/* <div>{plaintext}</div> */}
        </div>
    );
}

export default Home;
