import React from "react";

export default function ContactInfo() {
  return (
    <div className="border-t border-gray-200 pb-16 pt-48 dark:border-gray-600">
      <div className="relative mx-10vw" id="contacts">
        <div className="relative mx-auto grid max-w-7xl grid-cols-4 grid-rows-max-content gap-x-4 md:grid-cols-8 xl:grid-cols-12 xl:gap-x-6">
          <div className="col-span-full md:col-span-3 xl:row-span-2 text-white pl-3">
            <div>
              <div className="text-2xl md:text-2xl font-sign">
                Srinivasan Sekar
              </div>
              <p className="text-secondary mt-6 max-w-md text-2xl">
                Thoughtworker
              </p>
              <p className="text-secondary max-w-md text-2xl">
                Open Source Contributor
              </p>
              <p className="text-secondary max-w-md text-2xl">
                Conference Speaker
              </p>
              <p className="text-secondary max-w-md text-2xl">Blogger</p>
              <p className="text-secondary max-w-md text-2xl">Mentor</p>
            </div>
          </div>
          <div className="col-span-4 col-start-9 row-span-2 row-start-1 mt-0 hidden xl:block">
            <img
              className="rounded-full shadow-2xl float-right scale-50 text-right"
              src={require("../../assets/images/SrinivasanSekar.jpg")}
              alt="srinivasan sekar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
