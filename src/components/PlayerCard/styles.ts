import { User } from 'phosphor-react-native'
import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 8px;
  margin-bottom: 16px;
`

export const Name = styled.Text`
  flex: 1;
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_200};
  `};
`

export const Icon = styled(User).attrs(({ theme }) => ({
  color: theme.COLORS.GRAY_200,
  size: 22,
  weight: 'fill',
}))`
  margin-left: 16px;
  margin-right: 12px;
`
