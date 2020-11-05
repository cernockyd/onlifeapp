/** @jsx jsx */
import {useEffect} from 'react'
import StarterLayout from 'components/StarterLayout'
import Router from 'next/router'
import Message from 'components/Message'
import htmlParser from 'react-markdown/plugins/html-parser'
import { jsx, Text, Heading, Container, Card, Button, Link as SLink, Spinner, AspectRatio, Grid, Box, Flex } from 'theme-ui'
import { NextPage } from 'next'
import Link from 'next/link'
import { getAllPostsForGroup } from 'utils/api'
import { NextSeo } from 'next-seo'
import useSWR from 'swr'
import Color from '@biossun/color'
import fetcher from 'lib/fetcher'
import ReactMarkdown from 'react-markdown/with-html'
import { Response } from 'pages/api/quiz/submissions-list'
import useUser from 'data/useUser'

interface Props {
  allPosts: any
}

const Index: NextPage<Props> = ({ allPosts }) => {
  const user = useUser()
  useEffect(() => {
    if (!user.loading && user.user) {
      Router.push('/prehled')
    }
  });
  //const {data, error} = useSWR<Response>('/api/quiz/submissions-list', fetcher)
  return (
    <StarterLayout>
      <NextSeo noindex title={'Přehled kvízů'} />
      <Box sx={{py: 6}}>
        <Container>
          <Grid columns={[2]}>
            <Flex sx={{justifyContent: 'center', flexDirection: 'column'}}>
              <Heading variant="specialtitle" sx={t => t.util.gxText('instagram', 'primary')}>Kvízy<br/>informační<br/>gramotnosti</Heading>
              <Flex sx={{alignItems: 'center', mt: 4}}>
                <Link passHref href="/api/registrace">
                  <Button
                    variant="ctaLg"
                    sx={{
                      borderRadius: 'small',
                      fontSize: 3,
                      mr: 4,
                      bg: 'foreground',
                    }}>
                    Zaregistrovat se
                  </Button>
                </Link>
                <Link passHref href="/api/login">
                  <a sx={{fontSize: 3, color: 'primary-accent-4', ':hover,:focus': {color: 'primary-accent-8'}}}>
                    Již mám účet
                  </a>
                </Link>
              </Flex>
            </Flex>
          </Grid>
        </Container>
      </Box>
      <Box sx={{py: 6, bg: 'snow'}}>
        <Container>
          <Grid columns={[2]}>
            <Flex sx={{flexDirection: 'column', justifyContent: 'center'}}>
              <Heading variant="ultratitle" sx={{mb: 3}}>
                Otázky pro<br/>každé téma.
              </Heading>
              <Flex>
                <Flex sx={{justifyContent: 'flex-end', flexDirection: 'column', mr: 4}}>
                  <Heading sx={{fontSize: 9, color: 'orange'}}>360+</Heading>
                  <Text variant="caption" sx={{textTransform: 'uppercase', fontSize: 3}}>otázek</Text>
                </Flex>
                <Flex sx={{justifyContent: 'flex-end', flexDirection: 'column', mr: 4}}>
                  <Heading sx={{fontSize: 8}}>60+</Heading>
                  <Text variant="caption" sx={{textTransform: 'uppercase', fontSize: 3}}>kvízů</Text>
                </Flex>
                <Flex sx={{justifyContent: 'flex-end', flexDirection: 'column'}}>
                  <Heading variant="ultratitle">12</Heading>
                  <Text variant="caption" sx={{textTransform: 'uppercase', fontSize: 3}}>oblastí</Text>
                </Flex>
              </Flex>
            </Flex>
            <Grid columns={[4]}>    
              {
                allPosts.map((post, index) => {
                  const thumbnailCustomData = post.thumbnailPicture.customData
                  const primaryColor = Color(thumbnailCustomData?.primaryColor)
                  const secondaryColor = Color(thumbnailCustomData?.secondaryColor)
                  //const colorIndex = 1
                  //const brightness = brightnessByColor(colors[colorIndex].red, colors[colorIndex].green, colors[colorIndex].blue)
                  //const isLight = primaryColor.isLight()
                  //const filteredLeadingTexts = post.content?.filter((quizBlock, index) => quizBlock._modelApiKey === 'leading_text')
                  return(
                    <Card key={index} sx={{backgroundImage: t => t.util.gx(primaryColor.toString(), secondaryColor.toString()), color: 'white', px: '16px!important', py:  '16px!important'}}>
                      <Heading variant="subtitle" sx={{m: 0}}>{post.titulek}</Heading>
                      {/*
                        filteredLeadingTexts?.length > 0 && filteredLeadingTexts.map((leadingText, ltIndex) => (
                          <Text variant="lead">
                            <DatoText text={leadingText.text} />
                          </Text>
                        ))
                      */}
                      {/*post.url && <a sx={{variant: 'buttons.lg', bg: 'rgba(0,0,0,.5)', color: 'background', mt: 2, mb: 3, px: 3, py: 3, alignSelf: 'flex-start', ':hover,:focus': {textDecoration: 'none', color: 'background'}}} href={post.url}>Stránka tématu<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" shape-rendering="geometricPrecision"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg></a>*/}
          
                  </Card>
                )})
              }
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{py: 6, bg: 'background'}}>
        <Container>
          <Grid columns={[2]}>
            <Flex sx={{ alignItems: 'center', justifyContent: 'flex-end'}}>
              <Box sx={{maxWidth: 400}}>
                <Message avatar="/hanka-tulinska.jpg" message="Ano! Práce s uvozovkami je velmi dobrý nápad. Pokud výrazu přidáme uvozovky, pak výsledky budou obsahovat speciálně tento pojem. Pokud by v uvozovkách nebyl, vyhledali bychom dokumenty, ve kterých se tato dvě slova kdekoli vyskytnou." name="Hanka Tulinská" />
              </Box>
            </Flex>
            <Flex sx={{justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
              <Box>
                <Heading variant="ultratitle">
                  Zpětná<br/>vazba.
                </Heading>
                <Text variant="lead">
                  U každé otázky dostanete<br/>zpětnou vazbu našich tutorů.
                </Text>
              </Box>
            </Flex>
          </Grid>
        </Container>
      </Box>
    </StarterLayout>
  );
  
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForGroup(false)) || []
  //const allPostsSorted = allPosts.sort((a, b) => (a.position - b.position))
  return {
    props: { allPosts },
  }
}

export default Index