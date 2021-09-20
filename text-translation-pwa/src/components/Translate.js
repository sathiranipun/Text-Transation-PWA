import React ,{useState, useEffect} from 'react'
import {
    Form,
    TextArea,
    Button,
    Icon
} from 'semantic-ui-react';

import axios from 'axios';

export default function Translate(){

    const [inputText ,setInputText] = useState ('');

    const [detectLanguageKey, setdetectedLanguageKey] = useState('');

    const getLanguageSource = () => {
        axios.post (`https://libretranslate.de/detect`,{
            q : inputText
        }). then ((response) => {
            setdetectedLanguageKey(response.data[0].language);
            console.log ("language successfully detected");
            console.log (response);
        })
    }

    useEffect (() => {
        axios.get(`https://libretranslate.de/languages`)
        .then ((response) => {
            // console.log(response.data);
            setLanguageList(response.data);
        })
    })

    const [languageList,setLanguageList] = useState ([]);

    const [selectedLanguageKey , setLanguageKey] = useState ('');

    const languageKey = (selectedLanguage) => {
        setLanguageKey(selectedLanguage.target.value);
        console.log (selectedLanguage.target.value);
    }

    const [resultText , setResultText] = useState ('');

    const translateText = () => {
        getLanguageSource();

        let data = { q:inputText , source :detectLanguageKey , target: selectedLanguageKey}

        axios.post ('https://libretranslate.de/translate',data)
        .then((response)=>{
            setResultText(response.data.translateText);
        })
    }

    return (
        <div>
            <div className="app-header">
                <h2 className="header">Texty Translator</h2>
            </div>

            <div className='app-body'>
                <div>
                    <Form>
                    <Form.Field
                            control={TextArea}
                            placeholder='Type Text to Translate..'
                            onChange = {(e)=> setInputText(e.target.value)}
                        />
                    
                    <select className="language-select" onChange={languageKey}>
                            <option>Please Select Language..</option>
                            {
                                languageList.map((language) => {
                                    return (
                                        <option value ={language.code}>
                                            {language.name}
                                        </option>
                                        
                                    )
                                })
                            }
                    </select>

                    <Form.Field
                        control={TextArea}
                        placeholder={resultText}
                        value = {resultText}
                    />

                    <Button
                        color="orange"
                        size="large"
                        onClick={translateText}
                    >
                        <Icon name='translate' />
                        Translate</Button>
                    </Form>
                </div>
            </div>

            <div className="app-footer">
                <h5 className="footer">Developed by Sathira Nipun @designersfactory </h5>
            </div>
        </div>
    )
}