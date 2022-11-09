import React, { useEffect, useState } from 'react'
import {
  client,
  useConfig
} from "@sigmacomputing/plugin";


import GoogleTrends from "./googleTrends";

const googleUrl = '<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/3045_RC01/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"/m/0dl567","geo":"US","time":"now 7-d"},{"keyword":"/m/0261x8t","geo":"US","time":"now 7-d"}],"category":0,"property":""}, {"exploreQuery":"q=%2Fm%2F0dl567,%2Fm%2F0261x8t&date=now%207-d&geo=US","guestPath":"https://trends.google.com:443/trends/embed/"}); </script>'

client.config.configureEditorPanel([
  { name: 'Embed URL', type: 'text', defaultValue: googleUrl, Multiline: true },
]);

function GoogleTrendPlugin() {
  const [googleTrendUrl, setGoogleTrendUrl] = useState(googleUrl)
  const config = useConfig()

  useEffect(() => {
    client.config.subscribe((myconfig) => {
      setGoogleTrendUrl(myconfig['Embed URL'])
    })
    return () => config

  }, [config])


  return (
    <GoogleTrends
      id="charts"
      googleTrendUrl={googleTrendUrl}
    />
  )
}
export default GoogleTrendPlugin;