import React from 'react'
import { assets } from '../assets/assets'
import { Calendar, Clock, Star, Play } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className='relative flex flex-col items-start justify-center gap-6 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen pt-20'>
        
        {/* Overlay để text dễ đọc */}
        <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-black/30'></div>
        
        <div className='relative z-10 max-w-4xl'>
          
          {/* 🇻🇳 Vietnamese Studio Logo */}
          <div className='flex items-center gap-3 mb-4'>
            <img src={assets.marvelLogo} alt='Studio Logo' className="h-8 md:h-10"/>
            <span className='text-orange-400 font-medium text-sm tracking-wider'>PHIM CHIẾU RẠP</span> {/* 📝 NOTE: Thêm label Việt */}
          </div>
      
          {/* 🇻🇳 Vietnamese Title */}
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight'>
            Vệ Binh <br/> 
            <span className='text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text'>Dải Ngân Hà</span> {/* 📝 NOTE: Gradient cho từ "Dải Ngân Hà" */}
          </h1>

          {/* 🇻🇳 Vietnamese Subtitle */}
          <p className='text-gray-300 text-lg md:text-xl mb-6 max-w-2xl leading-relaxed'>
            Cuộc phiêu lưu vũ trụ đầy kịch tính với những người bạn bất đồng, 
            cùng nhau bảo vệ dải ngân hà khỏi những thế lực hắc ám.
          </p>

          {/* 🇻🇳 Vietnamese Movie Info */}
          <div className='flex flex-wrap items-center gap-4 text-gray-200 text-sm md:text-base mb-8'>
              
              {/* Thể loại */}
              <div className='bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 px-4 py-2 rounded-full backdrop-blur'>
                <span>Hành Động • Phiêu Lưu • Khoa Học Viễn Tưởng</span>
              </div>
              
              {/* Năm phát hành */}
              <div className='flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur'>
                  <Calendar className='w-4 h-4 text-blue-400' />
                  <span>2025</span>
              </div>

              {/* Thời lượng */}
              <div className='flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur'>
                  <Clock className='w-4 h-4 text-green-400' />
                  <span>2 giờ 9 phút</span> {/* 📝 NOTE: "2 giờ 9 phút" thay vì "2h 9m" */}
              </div>

              {/* Rating Việt Nam */}
              <div className='flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur'>
                  <Star className='w-4 h-4 text-yellow-400 fill-current' />
                  <span>T13 - Phù hợp từ 13 tuổi</span> {/* 📝 NOTE: Rating theo chuẩn Việt Nam */}
              </div>
          </div>

          {/* 🇻🇳 Vietnamese Action Buttons */}
          <div className='flex flex-wrap gap-4'>
              
              {/* Nút xem trailer */}
              <button className='flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25'>
                <Play className='w-5 h-5 fill-current' />
                <span>Xem Trailer</span>
              </button>

              {/* Nút đặt vé */}
              <button className='flex items-center gap-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-orange-500/25'>
                <Calendar className='w-5 h-5' />
                <span>Đặt Vé Ngay</span> {/* 📝 NOTE: Call-to-action Việt Nam */}
              </button>

              {/* Nút thêm vào danh sách yêu thích */}
              <button className='border-2 border-white/30 hover:border-white/50 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur hover:bg-white/10'>
                Yêu Thích
              </button>
          </div>

          {/* 🇻🇳 Vietnamese Cinema Info */}
          <div className='mt-8 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/20 backdrop-blur'>
            <div className='flex flex-wrap items-center justify-between gap-4 text-sm'>
              <div>
                <span className='text-blue-300 font-medium'>Đang chiếu tại:</span>
                <span className='text-white ml-2'>CGV, Lotte Cinema, Galaxy Cinema</span>
              </div>
              <div>
                <span className='text-purple-300 font-medium'>Suất chiếu:</span>
                <span className='text-white ml-2'>10:00 • 14:30 • 19:00 • 21:30</span>
              </div>
            </div>
          </div>

        </div>
    </div>
  )
}

export default HeroSection