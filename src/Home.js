import "./Engine.js";
import "./CSS/Home.css";
import { useState } from "react/cjs/react.development";
import CryptoJS from "crypto-js";

const Home = ()=>{

    const [isModeEnc,setisModeEnc] = useState(true);
    const [key,setKey] = useState("38346591");
    const [plaintext,setPlaintext] = useState("ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDy89t2VQ7Rsw7gsg+z1IwOoqBcNVJ3h1XUsgOMJM\u002FXJAHtzqlrR\u002Fa0Jxw7tS9a8Gtq");
    const [output, setOutput] = useState();

    let clean = ()=>{
        var temp;
        temp = plaintext.replace(/\\u002F/g,'/');
        setPlaintext(temp);
        console.log(plaintext);
        console.log(temp);
    }

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

    const calculate = ()=>{
        if(key.trim()&&plaintext.trim())
        {
            setOutput(decryptByDES(plaintext.trim(),key.trim()));
        }
    }
    const handletextChange=(e,what)=>{
        if(what ==="key")
        {
            setKey(e.target.value);
        }
        else{
            setPlaintext(e.target.value);
        }
    }
    

    return(
        <div className="content">
        
        <div className="center">
            <div className="function">
                <div className="enc toogle" onClick={()=>{setisModeEnc(true)}} style={{backgroundColor:isModeEnc?"rgb(255, 179, 0)":"transparent"}}>
                    <p className="fun_type">
                        Encrypt
                    </p>
                </div>
                <div className="dec toogle" onClick={()=>{setisModeEnc(false)}} style={{backgroundColor:isModeEnc?"transparent":"rgb(255, 179, 0)"}}>
                    <p className="fun_type">
                        Decrypt
                    </p>
                </div>
            </div>
        </div>
        <p>{plaintext}</p>
        <div className="center">

            <div className="prop_sel">

                <div className="mode_sel">
                    <label htmlFor="mode" className="sel_label">Choose a Mode</label>
                    <select name="mode" id="mode">
                    <option value="ECB">ECB</option>
                    <option value="CBC">CBC</option>
                    <option value="CTR">CTR</option>
                    <option value="OFB">OFB</option>
                    <option value="CFB">CFB</option>
                    </select>
                </div>

                <div className="padd_sel">
                    <label htmlFor="padd" className="sel_label">Select Padding</label>
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
                <label htmlFor="key" defaultValue={key}>Key</label>
                <input type="text" name="key" className="key_tb inp_txt" onChange={(e) => {handletextChange(e,"key")}}  />
                <label htmlFor="plaintext">Plaintext</label>
                <textarea defaultValue={plaintext} name="plaintext" className="plain_tb inp_txt" onChange={(e) => {handletextChange(e,"plaintext")}}  >
                </textarea>
                <p className="clean" onClick={clean}>Clean</p>

                
                {output && <div className="output">{output}</div>}

                <button className="submit_btn" onClick={calculate}>Submit</button>
            </div>
            
        </div>
        
        {/* <div>{plaintext}</div> */}
        </div>
    );
}

export default Home;
