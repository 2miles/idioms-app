import { styled } from 'styled-components';

import {
  Card,
  CardBody,
  CardHeader,
  SectionHeader,
} from '@/components/DetailPage/DetailCard/DetailCard.styles';
import PageContainer from '@/components/PageContainer';

// export const CardHeader = styled.div`
//   background-color: var(--bg-dark);
//   color: var(--color-text-primary);

//   h1 {
//     font-size: 1.5rem;
//     font-weight: 500;
//     line-height: 1.3;
//     letter-spacing: 0.5px;
//     color: var(--color-text-primary);
//     margin-top: var(--margin-lg);
//     text-align: center;
//   }
// `;
const AboutCardHeader = styled(CardHeader)`
  background-color: var(--bg-darker);
  padding-left: var(--padding-xxl);
  padding-right: var(--padding-xxl);
  h1 {
    text-align: left;
    font-size: 2rem;
  }
`;

const AboutCardBody = styled(CardBody)`
  margin-top: var(--margin-xl) !important;
  li {
    font-style: normal;
  }
`;

const AboutPage = () => {
  return (
    <PageContainer>
      <Card>
        <AboutCardHeader>
          <h1>What Is (and Isn’t) an Idiom?</h1>
        </AboutCardHeader>
        <AboutCardBody>
          <p>
            An idiom is a fixed expression whose meaning is not directly deducible from the literal
            meanings of its individual words. These expressions are part of a language’s informal
            vocabulary and are typically learned as whole units.
          </p>
          <SectionHeader>
            <h3>What Makes Something an Idiom?</h3>
          </SectionHeader>
          <p>
            <b>Figurative meaning:</b> The phrase as a whole has a non-literal meaning.
            <ul>
              <li>
                <i>"Spill the beans"</i> : is an idiom. The meaning has nothing to do with beans or
                spilling them.
              </li>
              <li>
                <i>"Gone, but not forgotten"</i> : is <b>not</b> an idiom. The meaning is literaly
                what is said.
              </li>
            </ul>
          </p>
          <p>
            <b>Fixed wording: </b>Idioms usually have a set structure and can’t be easily reworded.
            <ul>
              <li>
                <i>"Let the cat out of the bag"</i> : is an idiom.
              </li>
              <li>
                <i>"Let the kitten out of the sack"</i> : is <b>not</b> an idiom.
              </li>
            </ul>
          </p>
          <p>
            <b>Non-compositional: </b>You can’t usually figure out the meaning by analyzing each
            word.
            <ul>
              <li>
                <i>"Dont look a gift horse in the mouth"</i> : is an idiom. The meaning can not be
                deduced by analyzing each word.
              </li>
              <li>
                <i>"The more the merrier"</i> : is <b>not</b> an idiom. The meaing can be deduced
                from the individual words.
              </li>
            </ul>
          </p>
          <SectionHeader>
            <h3>What Idioms Can Overlap With:</h3>
          </SectionHeader>
          <p>
            <b>Metaphors</b> express a comparison indirectly (“time is a thief”). A metaphor can
            become idiomatic if it’s fixed and figurative — like “hit the ceiling” (to get very
            angry).
          </p>
          <p>
            <b>Similes</b> use “like” or “as” to compare things (“cold as ice”). Some similes are
            idioms (“Like a bull in a china shop"), but many are not. Some are idioms depending on
            context. For example "as cold as ice" is an idiom if you are refering to someones
            attitude but not if refering to an objects temperature.
          </p>
          <p>
            <b>Proverbs</b> are short, commonly known sayings that express a general truth or
            advice. Some proverbs are idiomatic, but not all. For example, "actions speek louder
            then words" is not an idiom. "Never bite the hand that feeds you" is an idiom. You’re
            not actually biting a hand
          </p>
        </AboutCardBody>
      </Card>
    </PageContainer>
  );
};

export default AboutPage;
