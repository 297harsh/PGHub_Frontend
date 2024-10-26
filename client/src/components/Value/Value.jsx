import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import data from "./accordion.jsx";
import "./Value.css";
import Value_img from "../../assets/Home/Value.jpg"


const Value = () => {
  return (
    <section id="value" className="v-wrapper">
      <div className="paddings innerWidth flexCenter v-container">
        {/* left side */}
        <div className="v-left">
          <div className="image-container">
            <img src={Value_img} alt="" />
          </div>
        </div>

        {/* right */}
        <div className="flexColStart v-right">
          <span className="orangeText">The Values</span>
          <span className="primaryText">Values We will Give to You</span>
          <span className="secondaryText">
            We always ready to assist you by providing the best to you.
            <br />
            We believe that a good place to live can make your life better and
            better
          </span>

          <Accordion
            className="accordion"
            allowMultipleExpanded={false}
            preExpanded={[0]}
          >
            {data.map((item, i) => (
              <AccordionItem
                className="accordionItem"
                uuid={i}
                key={i}
              >
                <AccordionItemHeading>
                  <AccordionItemButton className="flexCenter accordionButton">
                    {/* Use AccordionItemState to handle expanded state */}
                    <AccordionItemState>
                      {({ expanded }) => (
                        <>
                          <div className={`flexCenter icon ${expanded ? "expanded" : "collapsed"}`}>
                            {item.icon}
                          </div>
                          <span className="primaryText">{item.heading}</span>
                          <div className="flexCenter icon">
                            <MdOutlineArrowDropDown size={20} />
                          </div>
                        </>
                      )}
                    </AccordionItemState>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p className="secondaryText">{item.detail}</p>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Value;
