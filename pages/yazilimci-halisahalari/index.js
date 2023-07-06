import React from "react";
import SoccerMain from "../../components/SoccerMain";

const SoftwareSoccer = (props) => {
  console.log(props);
  return (
    <>
      <SoccerMain {...props} />
    </>
  );
};

export const getServerSideProps = async () => {
  const response = await fetch(process.env.API_URL + "feed?type=NORMAL");
  const { matches, players } = await response.json(); 
  return {
    props: { matches, players },
  };

};

export default SoftwareSoccer;
