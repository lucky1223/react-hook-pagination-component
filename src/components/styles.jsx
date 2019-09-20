import styled from 'styled-components'

export const PaginateWrapper = styled.div`
  margin-top: 1rem;
  ul {
    li {
      display: inline-block;
      cursor: pointer;

      &:first-child {
        a {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
      }

      &:last-child {
        a {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }

      }

      a {
        float: left;
        display: block;
        font-size: 14px;
        text-decoration: none;
        padding: 5px 12px;
        color: ${props => props.theme.normalText};
        margin-left: -1px;
        border:1px solid transparent;
        line-height: 1.5;
        border-color: ${props => props.theme.border};
        user-select: none;


      }
    }

    .disabled {
      cursor: not-allowed;
    }

    .active {
      background: ${props => props.theme.blue};
      color: ${props => props.theme.white};
    }
  }
` 