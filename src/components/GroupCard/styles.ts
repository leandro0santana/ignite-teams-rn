import { UsersThree } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 90px;
  flex-direction: row;
  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 12px;
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_200};
  `}
`

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
  color: theme.COLORS.GREEN_700,
  size: 32,
  weight: 'fill',
}))`
  margin-right: 20px;
`
