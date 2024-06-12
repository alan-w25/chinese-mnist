"use client"
import MainLayout from "../components/MainLayout";
import Canvas from '../components/Canvas';
import Digit from "../components/Digit";
import PredictionCard from "../components/PredictionCard";
import { useState, useEffect } from "react";



export default function Home() {

  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<string |null>(null);
  const [correct, setCorrect] = useState<string>('');
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [showPredictionCard, setShowPredictionCard] = useState<boolean>(false);


  return (
    <MainLayout>
      <div className="flex flex-col justify center mt-24">
        <div className="mb-8 px-4 max-w-3xl">
          <p className="text-lg">
            
            Hello! Welcome to my small project: Handwritten Chinese MNIST prediction. <br />
            Get started: draw a Chinese digit in the box below and click submit to see the prediction. 
            </p>
            <br />

            <ol className="list-decimal list-inside text-lg text-left">
              <li>Draw a Chinese digit in the canvas below by clicking + holding down your mouse</li>
              <li>Click the "Submit" button to get the prediction result and confidence</li>
              <li>In the dropdown, please select the actual digit of your drawing and if we were correct or not!</li>
              <li>At any point, if you would like to clear the canvas click "Clear" button</li>
            </ol>



            <p className="text-lg">
              The options to classify are 0-9, 100, 1000, 10000, and 100 million. 
              <br />
              <br />
              If you don't know how to write the chinese characters, please scroll down or click the "Learn" section to learn how to write all of the characters. 
            </p>
        </div>

        <section id="draw">
          <h2 className="text-5xl font-bold ml-4 mb-4">Draw</h2>
          <div className="flex w-full items-start">
            <div className="flex flex-col ml-8 mr-8">
              <Canvas setPrediction={setPrediction} setShowPredictionCard={setShowPredictionCard} setConfidence={setConfidence} />
            </div>

            <div className="flex flex-col items-center ml-12">
              {showPredictionCard &&
                (<PredictionCard 
                  prediction={prediction}
                  confidence={confidence}
                  wasCorrect={wasCorrect}
                  correct={correct}
                  setWasCorrect={setWasCorrect}
                  setCorrect={setCorrect}
                  setShowPredictionCard={setShowPredictionCard}
                  />
              )}
              
            </div>
            

          </div>
          
          

        </section>

        <section id="learn">
          <h2 className="text-5xl font-bold ml-4">Learn</h2>
          <p className="ml-4">In this section we will show all the digits that we can classify, the stroke pattern so you can learn to draw them, and also how the digits sound so you can learn a little bit of Mandarin Chinese!</p>
          <br />
          <Digit 
            name="Zero"
            character="零"
            pinyin="líng"
            audioSrc="/audio/cmnist-0.mp3"
            drawingGif="/gifs/cmnist-0.gif"
          />

          <Digit 
            name="One"
            character="一"
            pinyin="yī"
            audioSrc="/audio/cmnist-1.mp3"
            drawingGif="/gifs/cmnist-1.gif"
          />

          <Digit 
            name="Two"
            character="二"
            pinyin="èr"
            audioSrc="/audio/cmnist-2.mp3"
            drawingGif="/gifs/cmnist-2.gif" 
          />

          <Digit 
            name="Three"
            character="三"
            pinyin="sān"
            audioSrc="/audio/cmnist-3.mp3"
            drawingGif="/gifs/cmnist-3.gif"
            />

          <Digit
            name="Four"
            character="四"
            pinyin="sì"
            audioSrc="/audio/cmnist-4.mp3"
            drawingGif="/gifs/cmnist-4.gif"
          />
          <Digit
            name="Five"
            character="五"
            pinyin="wǔ"
            audioSrc="/audio/cmnist-5.mp3"
            drawingGif="/gifs/cmnist-5.gif"
          />
          <Digit
            name="Six"
            character="六"
            pinyin="liù"
            audioSrc="/audio/cmnist-6.mp3"
            drawingGif="/gifs/cmnist-6.gif"
          />
          <Digit
            name="Seven"
            character="七"
            pinyin="qī"
            audioSrc="/audio/cmnist-7.mp3"
            drawingGif="/gifs/cmnist-7.gif"
            />
          <Digit
            name="Eight"
            character="八"
            pinyin="bā"
            audioSrc="/audio/cmnist-8.mp3"
            drawingGif="/gifs/cmnist-8.gif"
          />
          <Digit 
            name="Nine"
            character="九"
            pinyin="jiǔ"
            audioSrc="/audio/cmnist-9.mp3"
            drawingGif="/gifs/cmnist-9.gif"
          />
          <Digit 
            name="Hundred"
            character="百"
            pinyin="bǎi"
            audioSrc="/audio/cmnist-100.mp3"
            drawingGif="/gifs/cmnist-100.gif"
            />
          <Digit
            name="Thousand"
            character="千"
            pinyin="qiān"
            audioSrc="/audio/cmnist-1000.mp3"
            drawingGif="/gifs/cmnist-1000.gif"
            />
          <Digit
            name="Ten Thousand"
            character="万"
            pinyin="wàn"
            audioSrc="/audio/cmnist-10000.mp3"
            drawingGif="/gifs/cmnist-10000.gif"
          />
          <Digit 
            name="Hundred Million"
            character="亿"
            pinyin="yì"
            audioSrc="/audio/cmnist-hunmil.mp3"
            drawingGif="/gifs/cmnist-hunmil.gif"
          />


          

        </section>
        
      </div>
    </MainLayout>
  );
}
