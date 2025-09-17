import { Text, View } from "@react-pdf/renderer";
import { documentStyle as styles } from "./document_styles";
import { LI, UL } from "./document_layout";

export interface Job {
  title: string;
  time: string;
  description?: React.ReactNode[];
}

const JobSection = (props: { job: Job }) => {
  return (
    <View
      style={{
        marginBottom: 5,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 10,
            fontStyle: "italic",
            fontWeight: "light",
          }}
        >
          {props.job.title}
        </Text>
        <Text style={styles.time}>{props.job.time}</Text>
      </View>
      <UL>
        {props.job.description?.map((value, index) => (
          <LI key={index}>{value}</LI>
        ))}
      </UL>
    </View>
  );
};

export interface Company {
  company: string;
  location: string;
  jobs: Job[];
}

export const DocumentExperience = (props: {
  companies: Company[];
  wrap?: boolean;
}) => {
  return (
    <View>
      <Text style={styles.h4}>Experience</Text>
      <View style={styles.hr}></View>
      <View style={styles.content}>
        {props.companies.map((company, index) => (
          <View key={index} wrap={props.wrap}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.h5}>{company.company}</Text>
              <Text>{company.location}</Text>
            </View>
            {company.jobs.map((job, jobIndex) => (
              <JobSection job={job} key={jobIndex} />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};
