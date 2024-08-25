import '../App.css';
import React, { useState, useEffect, useRef } from "react";
import Slider from 'react-input-slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import xbot from '../Models/xbot/xbot.glb';
import ybot from '../Models/ybot/ybot.glb';
import xbotPic from '../Models/xbot/xbot.png';
import ybotPic from '../Models/ybot/ybot.png';

import * as words from '../Animations/words';
import * as alphabets from '../Animations/alphabets';
import { defaultPose } from '../Animations/defaultPose';

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// Import translation library
import { Translate } from '@google-cloud/translate';

function Convert() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [bot, setBot] = useState(ybot);
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  let textFromAudio = React.createRef();
  let textFromInput = React.createRef();

  const {
    transcript,
    listening,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {

    ref.flag = false;
    ref.pending = false;

    ref.animations = [];
    ref.characters = [];

    ref.scene = new THREE.Scene();
    ref.scene.background = new THREE.Color(0xdddddd);

    const spotLight = new THREE.SpotLight(0xffffff, 100);
    spotLight.position.set(0, 5, 5);
    ref.scene.add(spotLight);
    ref.renderer = new THREE.WebGLRenderer({ antialias: true });

    ref.camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth * 0.57 / (window.innerHeight - 70),
        0.1,
        1000
    )
    ref.renderer.setSize(window.innerWidth * 0.57, window.innerHeight - 70);

    document.getElementById("canvas").innerHTML = "";
    document.getElementById("canvas").appendChild(ref.renderer.domElement);

    ref.camera.position.z = 1.6;
    ref.camera.position.y = 1.4;

    let loader = new GLTFLoader();
    loader.load(
      bot,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if ( child.type === 'SkinnedMesh' ) {
            child.frustumCulled = false;
          }
    });
        ref.avatar = gltf.scene;
        ref.scene.add(ref.avatar);
        defaultPose(ref);
      },
      (xhr) => {
        console.log(xhr);
      }
    );

  }, [ref, bot]);

  ref.animate = () => {
    if(ref.animations.length === 0){
        ref.pending = false;
      return ;
    }
    requestAnimationFrame(ref.animate);
    if(ref.animations[0].length){
        if(!ref.flag) {
          if(ref.animations[0][0]==='add-text'){
            setText(text + ref.animations[0][1]);
            ref.animations.shift();
          }
          else{
            for(let i=0;i<ref.animations[0].length;){
              let [boneName, action, axis, limit, sign] = ref.animations[0][i]
              if(sign === "+" && ref.avatar.getObjectByName(boneName)[action][axis] < limit){
                  ref.avatar.getObjectByName(boneName)[action][axis] += speed;
                  ref.avatar.getObjectByName(boneName)[action][axis] = Math.min(ref.avatar.getObjectByName(boneName)[action][axis], limit);
                  i++;
              }
              else if(sign === "-" && ref.avatar.getObjectByName(boneName)[action][axis] > limit){
                  ref.avatar.getObjectByName(boneName)[action][axis] -= speed;
                  ref.avatar.getObjectByName(boneName)[action][axis] = Math.max(ref.avatar.getObjectByName(boneName)[action][axis], limit);
                  i++;
              }
              else{
                  ref.animations[0].splice(i, 1);
              }
            }
          }
        }
    }
    else {
      ref.flag = true;
      setTimeout(() => {
        ref.flag = false
      }, pause);
      ref.animations.shift();
    }
    ref.renderer.render(ref.scene, ref.camera);
  }

  const sign = (inputRef) => {
    
    var str = inputRef.current.value.toUpperCase();
    var strWords = str.split(' ');
    setText('')

    for(let word of strWords){
      if(words[word]){
        ref.animations.push(['add-text', word+' ']);
        words[word](ref);
        
      }
      else{
        for(const [index, ch] of word.split('').entries()){
          if(index === word.length-1)
            ref.animations.push(['add-text', ch+' ']);
          else 
            ref.animations.push(['add-text', ch]);
          alphabets[ch](ref);
          
        }
      }
    }
  }

  const translateText = async (inputText, targetLanguage) => {
    const translate = new Translate({ key: 'YOUR_API_KEY' });

    const [translation] = await translate.translate(inputText, targetLanguage);
    return translation;
  }

  const handleTranslateToGujarati = async () => {
    const inputText = textFromInput.current.value;
    const gujaratiText = await translateText(inputText, 'gu');
    setTranslatedText(gujaratiText);
    sign({ current: { value: gujaratiText } });
  }

  const handleTranslateToEnglish = async () => {
    const inputText = textFromAudio.current.value;
    const englishText = await translateText(inputText, 'en');
    setTranslatedText(englishText);
    sign({ current: { value: englishText } });
  }

  const startListening = () =>{
    SpeechRecognition.startListening({continuous: true});
  }

  const stopListening = () =>{
    SpeechRecognition.stopListening();
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <label className='label-style'>
            Processed Text
          </label>
          <textarea rows={3} value={text} className='w-100 input-style' readOnly />
          <label className='label-style'>
            Translated Text
          </label>
          <textarea rows={3} value={translatedText} className='w-100 input-style' readOnly />
          <label className='label-style'>
            Speech Recognition: {listening ? 'on' : 'off'}
          </label>
          <div className='space-between'>
            <button className="btn btn-primary btn-style w-33" onClick={startListening}>
              Mic On <i className="fa fa-microphone"/>
            </button>
            <button className="btn btn-primary btn-style w-33" onClick={stopListening}>
              Mic Off <i className="fa fa-microphone-slash"/>
            </button>
            <button className="btn btn-primary btn-style w-33" onClick={resetTranscript}>
              Clear
            </button>
          </div>
          <textarea rows={3} ref={textFromAudio} value={transcript} placeholder='Speech input ...' className='w-100 input-style' />
          <button onClick={handleTranslateToEnglish} className='btn btn-primary w-100 btn-style btn-start'>
            Translate to English & Start Animations
          </button>
          <label className='label-style'>
            Text Input
          </label>
          <textarea rows={3} ref={textFromInput} placeholder='Text input ...' className='w-100 input-style' />
          <button onClick={handleTranslateToGujarati} className='btn btn-primary w-100 btn-style btn-start'>
            Translate to Gujarati & Start Animations
          </button>
        </div>
        <div className='col-md-7'>
          <div id='canvas'/>
        </div>
        <div className='col-md-2'>
          <p className='bot-label'>
            Select Avatar
          </p>
          <img src={xbotPic} className='bot-image col-md-11' onClick={()=>{setBot(xbot)}} alt='Avatar 1: XBOT'/>
          <img src={ybotPic} className='bot-image col-md-11' onClick={()=>{setBot(ybot)}} alt='Avatar 2: YBOT'/>
          <div className='bot-options'>
            <label className='label-style'>
              Speed
            </label>
            <Slider axis='x' x={speed} xmin={0.1} xmax={1.0} xstep={0.05} onChange={({x}) => setSpeed(x)} className='slider-style'/>
            <label className='label-style'>
              Pause Duration
            </label>
            <Slider axis='x' x={pause} xmin={200} xmax={1000} xstep={100} onChange={({x}) => setPause(x)} className='slider-style'/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Convert;
