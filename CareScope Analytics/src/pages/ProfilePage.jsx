/**
 * @file ProfilePage.jsx
 * @description Care Coordinator Profile & Account Settings page.
 */

import PageShell from "../components/layout/PageShell";
import ProfileHeader from "../components/profile/ProfileHeader";
import CoordinatorStats from "../components/profile/CoordinatorStats";
import ContactCard from "../components/profile/ContactCard";
import CoverageCard from "../components/profile/CoverageCard";
import NotificationSettings from "../components/profile/NotificationSettings";
import ActivityTimeline from "../components/profile/ActivityTimeline";

export function ProfilePage() {
  return (
    <PageShell
      title="Coordinator Profile & Settings"
      sub="Personal credentials, ward coverage assignments, and notification preferences"
    >
      <ProfileHeader />
      <CoordinatorStats />

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ContactCard />
          <CoverageCard />
          <NotificationSettings />
        </div>

        <div className="lg:col-span-3">
          <ActivityTimeline />
        </div>
      </div>
    </PageShell>
  );
}

export default ProfilePage;
