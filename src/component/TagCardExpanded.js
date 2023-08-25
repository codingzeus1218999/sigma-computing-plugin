import React, { useState } from 'react'
// import { MdTimer, } from "react-icons/md";
import "./TagCardExpanded.css"
import {
  Text,
  Flex, IconButton, Image
} from "@chakra-ui/react";

import { MdMoreHoriz, MdTune } from 'react-icons/md'

// import { Card, CardHeader, CardBody, Heading, CardFooter } from '@chakra-ui/react'

export default function TagCardExpanded({
  bg,
  Post_Title,
  // Category_id,
  Tag,
  // Draft,
  Description,
  Tag_Icon_URL,
  First_name,
  Last_name,
  Person_title,
  Post_Create_time

}) {

  const [lines, setLines] = useState(3)
  const toggleLines = () => setLines(lines !== 3 ? 3 : null);
  const dateFormat = (x) => {
    if (!x) return "";
    const d = new Date(x)
    if (!d) return "";

    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }

  return (
    <div id="tagcard" style={{ background: bg }}>
      <div id="header">
        <div id="icon"> <Flex w='100%' mb='10px'>
          <Image src={Tag_Icon_URL ? Tag_Icon_URL : 'https://assets.boldlens.ai/logo/logomark-192x192.png'} w="60px" h="60px" me='auto' />
        </Flex></div>
        <div id="nameplate">
          <div id="card_head">{First_name} {Last_name}</div>
          <div className='sub-text'>{Person_title}</div>
          {Post_Create_time && <div className='sub-text-sm'> {dateFormat(Post_Create_time)}</div>}
        </div>
        <div id="icon-lg">
          {false &&
            <IconButton className='gray-k' colorScheme='gray' aria-label='Search database' size='sm' fontSize='28px' icon={<MdMoreHoriz />} />
          }
        </div>
      </div>
      <div id="body">
        <div id="posttile">{Post_Title}</div>
        <div >

          {lines ?
            <>
              <Text
                maxW="80ch"

                noOfLines={40} className="highlight"
              >
                <div id="postbody" dangerouslySetInnerHTML={{ __html: Description }}>
                  {/* { Description } */}
                </div>
              </Text>
              <p onClick={toggleLines} class="readmore">Read more...</p>
            </>
            :
            <>
              <Text
                onClick={toggleLines}

              >
                <div id="postbody" dangerouslySetInnerHTML={{ __html: Description }}>
                  {/* { Description } */}
                </div>
              </Text>
              <p onClick={toggleLines} class="readmore">Read less</p>
            </>
          }

        </div>
      </div>
      <div id="bottom">
        <div id="icon" style={{ margin: '5px 10px 5px 0px' }} > <MdTune fontSize='18px' /></div>
        <div style={{ marginRight: 'auto' }}>Category</div>
        {/* <div className="outline-Button">Publish</div>
        <div className="outline-Button">Edit</div>
        <div className="outline-Button">Destory</div> */}
      </div>
      {
        Tag && <div id="footer" >
          <div id="tags-outer">  {Tag.split(",").map((x) => <div id="insidetag">#{x} </div>)} </div>
        </div>
      }
    </div >

  )
}
