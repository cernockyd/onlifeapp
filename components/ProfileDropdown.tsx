/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Menu, MenuItem, MenuDivider, Popover, Position } from "@blueprintjs/core"
import Router from 'next/router'
import Link from 'next/link'
import { Link as Lstyle, Flex } from 'theme-ui'
import { AppNotifier } from '../utils/notifier'
import Avatar from './Avatar'
import { mutate } from 'swr'

export const ProfileDropdownPlaceholder = () => 
<Flex sx={{alignItems: 'center', py: '4px'}}>
  <span sx={{
    display: 'inline-block',
    ml: 4,
    background: '#eee',
    borderRadius: '6px',
    position: 'relative',
    py: 2,
    height: '21px',
    width: '124px',
  }}></span>
  <div sx={{
    display: 'inline-block',
    height: '32px',
    width: '32px',
    marginLeft: '.6em',
    background: '#eee',
    borderRadius: '50%'
  }}></div>
</Flex>

interface ProfileDropdownProps {
  photoURL: string
  name: string
  email: string
}

const ProfileDropdown = ({photoURL, name, email, ...props}: ProfileDropdownProps) => {
  return (
    <Popover
      position={Position.BOTTOM}
    >
      <Lstyle
        {...props}
        sx={{
          variant: 'styles.navlink',
        }}>
        <Flex sx={{alignItems: 'center'}}>
          { name ? name : email } 
          <Avatar
            name={name ? name : email}
            photoURL={photoURL}
            sx={{
              height: '32px',
              width: '32px',
              lineHeight: '32px',
              marginLeft: 3,
              display: 'inline-block',
              borderRadius: '16px',
              overflow: 'hidden'
            }}
          />
        </Flex>
      </Lstyle>
      <Menu sx={{zIndex: 80}}>
          <Link href="/nastaveni"><MenuItem text="Nastavení" /></Link>
          <MenuDivider />
          <MenuItem
          onClick={async () => {
            await fetch("/api/logout")
            mutate('/api/me')
            if (AppNotifier !== null) {
              AppNotifier.show({
                message: 'Sbohem …',
                icon: "hand",
                intent: 'warning',
              })
            }
            Router.push('/')
          }}
          text="Odhlásit se"
          />
        </Menu>
    </Popover>)
  }
  
  export default ProfileDropdown