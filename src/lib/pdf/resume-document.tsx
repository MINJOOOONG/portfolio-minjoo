import React from "react";
import { Document, Page, View, Text, Link, StyleSheet } from "@react-pdf/renderer";
import { registerFonts } from "./fonts";
import type { ResumeData } from "./types";

registerFonts();

const colors = {
  primary: "#111111",
  secondary: "#444444",
  muted: "#666666",
  accent: "#2563eb",
  border: "#e5e5e5",
  bg: "#ffffff",
};

const s = StyleSheet.create({
  page: {
    fontFamily: "NotoSansKR",
    fontSize: 9,
    color: colors.primary,
    backgroundColor: colors.bg,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 48,
  },
  // Header
  headerName: { fontSize: 20, fontWeight: 700, marginBottom: 2 },
  headerTitle: { fontSize: 11, color: colors.accent, fontWeight: 500, marginBottom: 6 },
  headerContact: { fontSize: 8, color: colors.muted, lineHeight: 1.6 },
  headerSummary: { fontSize: 9, color: colors.secondary, lineHeight: 1.6, marginTop: 8 },
  // Section
  section: { marginTop: 18 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.primary,
    marginBottom: 8,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  // Experience / Project card
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  cardTitle: { fontSize: 10, fontWeight: 700 },
  cardSubtitle: { fontSize: 9, fontWeight: 500, color: colors.secondary },
  cardPeriod: { fontSize: 8, color: colors.muted },
  cardSummary: { fontSize: 8.5, color: colors.secondary, marginTop: 2, marginBottom: 3 },
  bullet: { fontSize: 8.5, color: colors.secondary, marginLeft: 8, lineHeight: 1.5 },
  techRow: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 4 },
  techBadge: { fontSize: 7.5, color: colors.accent, backgroundColor: "#eff6ff", padding: "2 5", borderRadius: 3 },
  cardSpacing: { marginBottom: 10 },
  // Skills
  skillCategory: { fontSize: 9, fontWeight: 500, marginBottom: 2, marginTop: 6 },
  skillList: { fontSize: 8.5, color: colors.secondary, lineHeight: 1.5 },
  // Education table
  eduRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  eduSchool: { fontSize: 9, fontWeight: 500 },
  eduMajor: { fontSize: 8.5, color: colors.secondary },
  eduPeriod: { fontSize: 8, color: colors.muted },
  // About
  aboutText: { fontSize: 9, color: colors.secondary, lineHeight: 1.7 },
  aboutBold: { fontWeight: 700 },
});

function parseAbout(content: string) {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return <Text key={i}>{"\n"}</Text>;

    // bullet
    const bulletMatch = trimmed.match(/^[-*]\s+(.+)/);
    const displayText = bulletMatch ? `  \u2022 ${bulletMatch[1]}` : trimmed;

    // bold fragments
    const parts = displayText.split(/\*\*(.+?)\*\*/g);
    return (
      <Text key={i} style={s.aboutText}>
        {parts.map((part, j) =>
          j % 2 === 1 ? (
            <Text key={j} style={s.aboutBold}>{part}</Text>
          ) : (
            <Text key={j}>{part}</Text>
          )
        )}
        {"\n"}
      </Text>
    );
  });
}

export function ResumeDocument({ data }: { data: ResumeData }) {
  const { profile, about, experience, projects, skills, education, certifications } = data;

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View>
          <Text style={s.headerName}>{profile.name}</Text>
          <Text style={s.headerTitle}>{profile.title}</Text>
          <Text style={s.headerContact}>
            {profile.email} | {profile.phone} | {profile.location}
            {"\n"}
            <Link src={profile.github}>GitHub</Link> | <Link src={profile.linkedin}>LinkedIn</Link>
          </Text>
          <Text style={s.headerSummary}>{profile.summary}</Text>
        </View>

        {/* About */}
        {about && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>About</Text>
            <View>{parseAbout(about)}</View>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={s.cardSpacing} wrap={false}>
                <View style={s.cardHeader}>
                  <Text style={s.cardTitle}>{exp.company}</Text>
                  <Text style={s.cardPeriod}>{exp.period}</Text>
                </View>
                <Text style={s.cardSubtitle}>{exp.role}</Text>
                <Text style={s.cardSummary}>{exp.summary}</Text>
                {exp.achievements.map((a, j) => (
                  <Text key={j} style={s.bullet}>{`\u2022 ${a}`}</Text>
                ))}
                {exp.techStack && exp.techStack.length > 0 && (
                  <View style={s.techRow}>
                    {exp.techStack.map((t, j) => (
                      <Text key={j} style={s.techBadge}>{t}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={s.cardSpacing} wrap={false}>
                <View style={s.cardHeader}>
                  <Text style={s.cardTitle}>{proj.title}</Text>
                  <Text style={s.cardPeriod}>{proj.period}</Text>
                </View>
                <Text style={s.cardSubtitle}>{proj.teamSize}</Text>
                <Text style={s.cardSummary}>{proj.summary}</Text>
                {proj.description.map((d, j) => (
                  <Text key={j} style={s.bullet}>{`\u2022 ${d}`}</Text>
                ))}
                {proj.techStack.length > 0 && (
                  <View style={s.techRow}>
                    {proj.techStack.map((t, j) => (
                      <Text key={j} style={s.techBadge}>{t}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {Object.keys(skills).length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Skills</Text>
            {Object.entries(skills).map(([category, items]) => (
              <View key={category}>
                <Text style={s.skillCategory}>{category}</Text>
                <Text style={s.skillList}>{items.join(", ")}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Education & Certifications */}
        {(education.length > 0 || certifications.length > 0) && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Education & Certifications</Text>
            {education.map((edu, i) => (
              <View key={i} style={s.eduRow}>
                <View>
                  <Text style={s.eduSchool}>{edu.school}</Text>
                  <Text style={s.eduMajor}>{edu.major}</Text>
                </View>
                <Text style={s.eduPeriod}>{edu.period}</Text>
              </View>
            ))}
            {certifications.map((cert, i) => (
              <View key={i} style={s.eduRow}>
                <Text style={s.eduSchool}>{cert.name}</Text>
                <Text style={s.eduPeriod}>{cert.date}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
