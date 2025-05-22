import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FFF5E1]">Loading...</div>;
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF5E1]">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-[#8B5E3C] mb-4">Profile Not Found</h2>
          <button
            onClick={() => navigate('/login')}
            className="bg-[#8B5E3C] text-white px-6 py-2 rounded-lg hover:bg-[#6e462b] mt-4"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5E1] p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 flex flex-col items-center gap-6 border-2 border-[#8B5E3C]">
        <div className="w-32 h-32 rounded-full border-4 border-[#8B5E3C] bg-[#FFF5E1] flex items-center justify-center overflow-hidden shadow mb-4">
          {profile.sellerProfile?.imageUrl ? (
            <img
              src={`http://localhost:5000${profile.sellerProfile.imageUrl}`}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-[#8B5E3C] text-4xl">+</span>
          )}
        </div>
        <h2 className="text-2xl font-bold text-[#8B5E3C]">{profile.sellerProfile?.username || profile.username || 'User'}</h2>
        <p className="text-[#5C4033] text-center">{profile.sellerProfile?.description || 'No description provided.'}</p>
        <div className="w-full flex flex-col gap-2 mt-4">
          <div className="flex justify-between text-[#8B5E3C] font-medium">
            <span>Email:</span>
            <span>{profile.email}</span>
          </div>
          {profile.phone && (
            <div className="flex justify-between text-[#8B5E3C] font-medium">
              <span>Phone:</span>
              <span>{profile.phone}</span>
            </div>
          )}
        </div>
        <button
          onClick={() => navigate('/farmer-profile')}
          className="bg-[#8B5E3C] text-white px-6 py-2 rounded-lg hover:bg-[#6e462b] mt-4"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
