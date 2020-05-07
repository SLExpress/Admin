import React from "react";
import { Grid } from "semantic-ui-react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWapper>
      <Grid>
        <Grid.Column
          mobile={16}
          tablet={16}
          computer={16}
          style={{ background: "#e9ecef" }}
        >
          <FooterWrappers>
            <div className="container py-3">
              <div className="row">
                <div className="col-md-6">
                  <p className="text-capitalize">
                    copyright &copy; SLExpress {new Date().getFullYear()}. all
                    rights reserved
                  </p>
                </div>
                <div className=" col-md-6 d-flex justify-content-around">
                  {/* {value.socialLinks.map(item => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={item.id}
                    >
                      {item.icon}
                    </a>
                  ))} */}
                </div>
              </div>
            </div>
          </FooterWrappers>
        </Grid.Column>
      </Grid>
    </FooterWapper>
  );
};

export default Footer;

const FooterWapper = styled.div`
  height: 50px;
  margin-top: 2.5rem;
  margin-left: 10px;
`;

// const GridWapper = styled.div`
//   margin-top: 0;
//   margin-bottom: 0;
//   margin-left: 0;
//   margin-right: 0;
// `;

const FooterWrappers = styled.footer`
  background: var(--lightGrey);
  color: var(--mainWhite);
  .icon {
    font-size: 1.5rem;
    color: var(--mainWhite);
    transition: var(--mainTransition);
  }
  .icon:hover {
    color: var(--primaryColor);
    cursor: pointer;
  }
`;
