import React, { useEffect, useState } from 'react'
import {
  client,
  useVariable,
  useConfig
} from "@sigmacomputing/plugin";


import GoogleTrends from "./googleTrends";

const googleUrl = '<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/3045_RC01/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"/m/0dl567","geo":"US","time":"now 7-d"},{"keyword":"/m/0261x8t","geo":"US","time":"now 7-d"}],"category":0,"property":""}, {"exploreQuery":"q=%2Fm%2F0dl567,%2Fm%2F0261x8t&date=now%207-d&geo=US","guestPath":"https://trends.google.com:443/trends/embed/"}); </script>'

client.config.configureEditorPanel([
  { name: 'Embed URL', type: 'text', defaultValue: googleUrl, Multiline: true },
  { name: "source", type: "element" },
]);

function GoogleTrendPlugin() {
  const [googleTrendUrl, setGoogleTrendUrl] = useState(googleUrl)

  const config = useConfig()

  useEffect(() => {

    console.log("Ranjit Dev");
    // console.log({ FirstConf: client.config.get('Embed URL') })
    client.config.subscribe((myconfig) => {
      console.log("Ranjit Dev");
      console.log('Lisner is working')
      console.table({ myconfig })
      setGoogleTrendUrl(myconfig['Embed URL'])
    })
    return () => config

  }, [])


  return (
    <GoogleTrends
      id="charts"
      googleTrendUrl={googleUrl}
    />
  )
}
export default GoogleTrendPlugin;