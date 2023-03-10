import Page from "../../components/layout/Page";
import Header from "@/components/content/Header";
import {
  Box,
  Button,
  Step,
  Stepper,
  Typography,
  StepButton,
} from "@mui/material";
import Head from "next/head";
import React from "react";
import FormSection from "@/components/layout/FormSection";
import FormPane from "@/components/layout/FormPane";
import HouseSituationForm from "@/components/forms/housing/HouseSituationForm";
import PersonalSituationForm from "@/components/forms/housing/PersonalSituationForm";
import FinancialSituationForm from "@/components/forms/housing/FinancialSituationForm";
import useStepper from "@/hooks/useStepperAction";
import { HousingFormProvider } from "@/contexts/HousingFormContext";
import ResultsForm from "@/components/forms/housing/HousingResultsForm";
import HousingResultsChart from "@/components/forms/housing/results/HousingResultsChart";

const forms = [
  {
    label: "House",
    component: <HouseSituationForm />,
    results: <HousingResultsChart />,
  },
  {
    label: "Person",
    component: <PersonalSituationForm />,
    results: <HousingResultsChart />,
  },
  {
    label: "Finance",
    component: <FinancialSituationForm />,
    results: <HousingResultsChart />,
  },
  {
    label: "Results",
    component: <ResultsForm />,
    results: <HousingResultsChart />,
  },
];

export default function Housing() {
  const [activeForm, handleNext, handleBack, handleStep] = useStepper(forms);

  return (
    <>
      <Head>
        <title>Investement Calculators</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Page>
          <Header text="Housing Calculator" />
          <HousingFormProvider>
            <FormSection>
              <Box
                sx={{
                  mx: "auto",
                  my: 2,
                  px: 2,
                }}
              >
                <Stepper nonLinear activeStep={activeForm}>
                  {forms.map((form, index) => (
                    <Step key={form.label}>
                      <StepButton
                        color="inherit"
                        onClick={handleStep(index)}
                      ></StepButton>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              <FormPane>{forms[activeForm].component}</FormPane>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  mx: 2,
                  my: 1,
                }}
              >
                <Button
                  disabled={activeForm === 0}
                  onClick={handleBack}
                  sx={{
                    bgcolor: "#1E293B",
                  }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {activeForm !== forms.length - 1 && (
                  <Button
                    onClick={handleNext}
                    sx={{
                      bgcolor: "#1E293B",
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </FormSection>
          </HousingFormProvider>
        </Page>
      </main>
    </>
  );
}
