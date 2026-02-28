import Container from "@components/ui/Container.tsx";
import Section from "@components/ui/Section.tsx";
import Card from "@components/ui/Card.tsx";
import CardHeader from "@components/ui/CardHeader.tsx";
import CardContent from "@components/ui/CardContent.tsx";
import CardFooter from "@components/ui/CardFooter.tsx";


const DemoCard = () => {
  return (
      <>
        <Container>
          <Section>
            <Card>
              <CardHeader>Student Stats</CardHeader>

              <CardContent>
                This is content
              </CardContent>

              <CardFooter>Footer actions</CardFooter>
            </Card>
          </Section>
        </Container>
      </>
  )
}

export default DemoCard;