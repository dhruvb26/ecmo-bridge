import React from "react";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
const FAQ = () => {
  return (
    <section className="bg-transparent py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            FAQs
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-300">
            Explore the common questions and answers about our app.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-20 gap-y-16 md:mt-20 md:grid-cols-2">
          <div className="flex items-start">
            <QuestionMarkCircledIcon className="text-primary-purple-600 h-8 w-8 flex-shrink-0" />
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                What is ECMO Bridge?
              </p>
              <p className="mt-4 text-base text-white">
                ECMO Bridge is an application developed by the AMRAS team at
                EPICS@ASU to streamline the allocation of ECMO machines to
                patients who urgently need them. By using a dynamic matching
                algorithm, our application ensures that ECMO machines are
                efficiently distributed based on factors like medical urgency
                and geographic location.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <QuestionMarkCircledIcon className="text-primary-purple-600 h-8 w-8 flex-shrink-0" />
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                Who can use it?
              </p>
              <p className="mt-4 text-base text-white">
                ECMO Bridge is designed for use by medical professionals,
                including doctors, nurses, and hospital administrators, who are
                involved in the critical care and management of patients
                requiring ECMO support.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <QuestionMarkCircledIcon className="text-primary-purple-600 h-8 w-8 flex-shrink-0" />
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                Is it efficient?
              </p>
              <p className="mt-4 text-base text-white">
                Our application incorporates real-time data tracking and an
                advanced matching algorithm that considers multiple factors such
                as medical priority, machine compatibility, and availability.
                This approach not only optimizes resource utilization but also
                aims to improve patient outcomes by ensuring timely access to
                necessary medical equipment.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <QuestionMarkCircledIcon className="text-primary-purple-600 h-8 w-8 flex-shrink-0" />
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                How do you provide support?
              </p>
              <p className="mt-4 text-base text-white">
                Contact us at amras@asu.edu for any queries or support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
