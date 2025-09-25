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
      <Text style={styles.h4}>Experiences</Text>
      <View style={styles.hr}></View>
      {props.companies.map((company, index) => (
        <View key={index}>
          <View style={styles.content}>
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
            <View>
              {company.jobs.map((job, jobIndex) => (
                <JobSection job={job} key={jobIndex} />
              ))}
            </View>
          </View>
          {index != props.companies.length - 1 && (
            <View style={styles.subHr}></View>
          )}
        </View>
      ))}
    </View>
  );
};

export const DocumentActivity = (props: {
  companies: Company[];
  wrap?: boolean;
}) => {
  return (
    <View>
      <Text style={styles.h4}>Activities</Text>
      <View style={styles.hr}></View>
      {props.companies.map((company, index) => (
        <View key={index}>
          <View style={styles.content}>
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
            <View>
              {company.jobs.map((job, jobIndex) => (
                <JobSection job={job} key={jobIndex} />
              ))}
            </View>
          </View>
          {index != props.companies.length - 1 && (
            <View style={styles.subHr}></View>
          )}
        </View>
      ))}
    </View>
  );
};
