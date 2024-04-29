"use client";

import React from "react";

function AboutPage() {
  return (
    <div className="bg-default-background container flex h-full w-full max-w-none flex-col items-center gap-4 pb-12 pl-6 pr-6 pt-12">
      <div className="flex w-full max-w-[768px] flex-col items-center gap-6">
        <div className="flex w-full max-w-[576px] flex-col items-center justify-center gap-6 pb-6 pl-6 pr-6 pt-6">
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <h1 className="w-full text-center text-4xl font-bold">
              Welcome to ECMO Bridge
            </h1>
            <p className="text-center text-lg font-light  text-gray-500">
              Discover and create custom AI models to superpower your life,
              business, and creativity all from your computer.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-12">
          <div className="flex w-full flex-col items-center gap-16">
            <div className="flex w-full flex-col items-start gap-4">
              <h1 className="w-full text-xl font-bold">Our Mission</h1>
              <span className="text-body font-body text-subtext-color w-full">
                At ECMO Bridge, our mission is to transform how critical
                resources are managed in healthcare settings. Through the use of
                our dynamic allocation system, we are committed to improving
                outcomes for patients requiring ECMO therapy by ensuring they
                receive the support they need without delay.
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-16">
            <div className="flex w-full flex-col items-start gap-4">
              <span className="text-heading-2 font-heading-2 text-default-font w-full">
                Explore Our Features
              </span>
              <span className="text-body font-body text-subtext-color w-full">
                Dive into our platform to discover how ECMo Bridge simplifies
                the complex process of resource allocation. With real-time
                updates, a user-friendly interface, and a robust backend powered
                by cutting-edge technology, we provide a seamless experience for
                healthcare providers. Explore our site to learn more about how
                our application can integrate into your workflow and help save
                lives. This content and the FAQs are designed to introduce the
                application, outline its benefits, and address typical
                questions, making the landing page both informative and engaging
                for new visitors.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
