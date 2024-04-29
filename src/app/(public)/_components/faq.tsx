import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const FAQ = () => {
  return (
    <Accordion type="single" collapsible className="w-[50%]">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is ECMO Bridge?</AccordionTrigger>
        <AccordionContent>
          ECMO Bridge is an application developed by the AMRAS team at EPICS@ASU
          to streamline the allocation of ECMO machines to patients who urgently
          need them. By using a dynamic matching algorithm, our application
          ensures that ECMO machines are efficiently distributed based on
          factors like medical urgency and geographic location.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Who can use it?</AccordionTrigger>
        <AccordionContent>
          ECMO Bridge is designed for use by medical professionals, including
          doctors, nurses, and hospital administrators, who are involved in the
          critical care and management of patients requiring ECMO support.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it efficient?</AccordionTrigger>
        <AccordionContent>
          Our application incorporates real-time data tracking and an advanced
          matching algorithm that considers multiple factors such as medical
          priority, machine compatibility, and availability. This approach not
          only optimizes resource utilization but also aims to improve patient
          outcomes by ensuring timely access to necessary medical equipment.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FAQ;
