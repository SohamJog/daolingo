import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  button,
} from "@material-tailwind/react";
import { UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import { createUser } from "../scripts/polybase.js";



export function Home() {

  return (
    <>
   
       
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        
        <div className="absolute top-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1521920592574-49e0b121c964?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center" />


        

        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                DAOLINGO
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                Reviving Languages, Saving Forgotten Tongues
              </Typography>
            </div>
          </div>
        </div>
      </div>


      <div>
     
     

    </div>

      <section className="-mt-32 bg-gray-50 px-4 pb-20 pt-4">
      <div className="container mx-auto">


      <div className="mx-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
            {featuresData.map(({ color, title, icon, description }) => (
              <> 
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white ",
                })}
                description={description}
                className="transition duration-300 ease-in-out transform hover:scale-110"
              />
              </>
            ))}
          </div>








          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
                <UsersIcon className="h-6 w-6 text-blue-gray-900" />



              </div>
              <div className="text-center">
                <Typography
                  variant="h3"
                  className="mb-3 font-bold text-4xl text-blue-gray-700 transition duration-500 ease-in-out transform hover:scale-110"
                >
                  Become a part of a revolution
                </Typography>
                <Typography className="mb-8 font-normal text-lg text-blue-gray-500">
                  Contribute to the expansive archive of languages, preserving and safeguarding linguistic heritage for future generations. Join a passionate community dedicated to language preservation, revitalization, and research. Explore diverse linguistic traditions, connect with fellow language enthusiasts, and embark on a journey of discovery. Unleash your curiosity, share your expertise, and make a lasting impact on the world of languages. Together, we can build a vibrant and inclusive linguistic tapestry that celebrates the richness and diversity of human communication. Join us today and be a catalyst for the language revolution.
                </Typography>
                <Button
                  variant="outlined"
                  className="px-6 py-3 mx-3 font-bold text-lg text-white bg-blue-900 hover:bg-blue-300 transition duration-300"
                >
                  Join Now
                </Button>
                <Button
                  variant="outlined"
                  className="px-6 py-3 mx-3 font-bold text-lg text-white bg-blue-900 hover:bg-blue-300 transition duration-300"
                >
                  <a href="/inputs">
                  Start contributing!
                  </a>
                  

                </Button>
              </div>
                        
            </div>


            
            
          </div>
        </div>
      </section>



     
     




      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default Home;
