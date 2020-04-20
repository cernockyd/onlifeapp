/** @jsx jsx */
import { Component } from 'react'
import NewFirebaseAuth from '../NewFirebaseAuth'
import { setSession } from '../../utils/auth/firebaseSessionHandler'
import initFirebase from '../../utils/auth/initFirebase'
import firebase from "firebase"
import { Flex, Box } from 'reflexbox'
import Router from 'next/router'
import Link from 'next/link'
import { jsx, Text, Heading, Link as Lstyle } from 'theme-ui'
import SignUpLayout from './SignUpLayout'

const Feature = ({heading, description}) => (
  <Flex sx={{mb: 4}}>
    <Box sx={{mr: '20px'}}>
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="#0000dc"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        shapeRendering="geometricPrecision"
        style={{color:'#0000dc', fill: '#0000dc', stroke: '#fff'}}>
        <path
          d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
          fill="#0000dc"
          stroke="#0000dc">
        </path>
        <path
          d="M8 11.8571L10.5 14.3572L15.8572 9"
          fill="none" stroke="#fff">
        </path>
      </svg>
    </Box>
    <Box>
      <Heading as="h2" mb={3}>{heading}</Heading>
      <Text sx={{fontSize: 2, color: 'gray'}}>{description}</Text>
    </Box>
  </Flex>
)

class SignIn extends Component {
    constructor(props) {
      super(props);
    }
  
    async componentDidMount() {
      //const { apolloClient } = this.props;
  
      // If the user is already signed, they don't need to be here
      //const { loggedInUser } = await checkLoggedIn(apolloClient);
      //if (loggedInUser.user) {
      //  redirect(context, "/");
      //}
  
      // Firebase
      initFirebase();
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
  
      this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          return setSession(user)
            .then(() => firebase.auth().signOut())
//           .then(() => clearAuthDataCache(apolloClient))
            .then(() => Router.push("/"));
        }
      });
    }
  
    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
      this.unregisterAuthObserver();
    }
  
    render() {
      const { features, logo, heading, isForStudents = true } = this.props

      return (<SignUpLayout>
        <div sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          minWidth: '1px',
          width: '50vw',
          background: '#fafafa'
        }}></div>
        <Flex
          sx={{position: 'relative'}}
          maxWidth={1240}
          px={35}
          width={[1, 5/6]}
          mx="auto"
        >
          <Box sx={{
            mt: 4,
            mb: 5, 
          }}>
            <Link href="/">
              <Lstyle 
                sx={{
                  variant: 'styles.navlogo',
                  letterSpacing: '.03em',
                  fontSize: 5,
                }}>
                {logo}
              </Lstyle>
            </Link>
          </Box>
        </Flex>
        <Flex
          sx={{position: 'relative'}}
          maxWidth={1240}
          px={35}
          width={[1, 5/6]}
          mx="auto"
        >
          <Box
            width={[ 1/2 ]}
            pr={6}>
            <Flex flexDirection="column" justifyContent="flex-start" alignItems="stretch">
              {features.map(({heading, description}) => <Feature heading={heading} description={description} />)}
            </Flex>
          </Box>
          <Box
            width={[ 1/2 ]}
            pl={6}>
            <Flex flexDirection="column" justifyContent="flex-start" alignItems="stretch">
              <Heading sx={{color: 'text', fontWeight: 700, fontSize: 7, mb: '50px'}}>
                {heading}
              </Heading>
              <Box width="400px" mr="auto">
                <NewFirebaseAuth />
              </Box>
              <Text color="grey" sx={{mt: 2, mb: 4, fontSize: 2, fontWeight: 400}}>
                Kliknutím na tlačítko souhlasíte s podmínkami a zásadami o soukromí naší služby.
              </Text>
              <Text sx={{pb: 4, mb: 5, fontSize: 2, fontWeight: 400, borderBottom: '1px solid', borderColor: 'darken'}}>
                Již máte účet? <Link passHref href="/prihlaseni"><Lstyle>Přihlaste se</Lstyle></Link> 
              </Text>
              {isForStudents && <Text sx={{mb: 5, fontSize: 2, fontWeight: 400}}>
                Jste učitel? <Link passHref href="/registrace-ucitele"><Lstyle>Zaregistrujte si učitelský účet</Lstyle></Link> 
              </Text>}
              {!isForStudents && <Text sx={{mb: 5, fontSize: 2, fontWeight: 400}}>
                Jste student? <Link passHref href="/registrace"><Lstyle>Zaregistrujte si studentský účet</Lstyle></Link> 
              </Text>}
            </Flex>
          </Box>
        </Flex>
      </SignUpLayout>);
    }
}

export default SignIn