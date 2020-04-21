/** @jsx jsx */
import Header from './Header'
import Footer from './Footer'
import MasarykBar from './MasarykBar'
import { jsx, Text } from 'theme-ui'
import { Sticky, StickyContainer } from 'react-sticky'
import { Flex, Box } from 'reflexbox'
// <MasarykBar />
const StarterLayout = ({ showDescription = () => false, stickHeaderByDefault = false, ...props }) => (
  <StickyContainer>
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
      <Sticky>
      {({ style, distanceFromTop, distanceFromBottom }) => {
        const isSticky = !(!stickHeaderByDefault && (distanceFromTop == 0)) 
        return (
          <div style={style}
            className={(isSticky ? 'is-sticky' : 'not-sticky')}>
            <Header showDescription={showDescription(distanceFromTop, distanceFromBottom)}/>
          </div>
        )
      }
      }
    </Sticky>
    <style jsx>{`
      .is-sticky {
        box-shadow: 0 1px 0 0 rgba(0,0,0,0.1);
        transition: box-shadow .1s ease 0s;
        -webkit-backdrop-filter: saturate(180%) blur(5px);
        backdrop-filter: saturate(180%) blur(5px);
      }
      .not-sticky {
        transition: box-shadow .1s ease 0s;
        box-shadow: none;
      }
    `}</style>
      <main sx={{ width: '100%', flex: '1 1 auto' }}>
        {props.children}
      </main>
      <Footer />
    </div>
  </StickyContainer>
);

export default StarterLayout