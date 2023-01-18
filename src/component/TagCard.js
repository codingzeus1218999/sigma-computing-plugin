import React from 'react'
// import { MdTimer, } from "react-icons/md";
import "./TagCard.css"
import {
  Text,
  Flex, IconButton, Image
} from "@chakra-ui/react";

import { MdMoreHoriz, MdTune } from 'react-icons/md'

// import { Card, CardHeader, CardBody, Heading, CardFooter } from '@chakra-ui/react'

export default function TagCard({
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


  const dateFromat = (x) => {
    if (!x) return "";
    const d = new Date(x)
    if (!d) return "";

    return `${d.getDate()} ${d.getMonth() + 1} ${d.getFullYear()}`;
  }

  return (
    <div id="tagcard" style={{ background: bg }}>
      <div id="header">
        <div id="icon"> <Flex w='100%' mb='10px'>
          <Image src={Tag_Icon_URL ? Tag_Icon_URL : 'https://i.ibb.co/ZWxRPRq/Venus-Logo.png'} w="60px" h="60px" me='auto' />
        </Flex></div>
        <div id="nameplate">
          <div id="card_head">{First_name} {Last_name}</div>
          <div className='sub-text'>{Person_title}</div>
          {Post_Create_time && <div className='sub-text-sm'> {dateFromat(Post_Create_time)}</div>}
        </div>
        <div id="icon-lg"><IconButton className='gray-k' colorScheme='gray' aria-label='Search database' size='sm' fontSize='28px' icon={<MdMoreHoriz />} /></div>
      </div>
      <div id="body">
        <div id="posttile">{Post_Title}</div>
        <div >
          <Text
            maxW="40ch"
          // noOfLines={3}
          >

            <div id="postbody" dangerouslySetInnerHTML={{ __html: Description }}>
              {/* { Description } */}
            </div>


          </Text>

        </div>
      </div>
      <div id="bottom">
        <div id="icon" style={{ margin: '5px 10px 5px 0px' }} > <MdTune fontSize='18px' /></div>
        <div style={{ marginRight: 'auto' }}>Category</div>
        <div className="outline-Button">Publish</div>
        <div className="outline-Button">Edit</div>
        <div className="outline-Button">Destory</div>
      </div>
      {Tag && <div id="footer" >
        <div className='mtop'>  Tags: </div>
        <div id="tags-outer">  {Tag.split(",").map((x) => <div id="insidetag">#{x} </div>)} </div>
      </div>
      }
    </div>

  )
}
