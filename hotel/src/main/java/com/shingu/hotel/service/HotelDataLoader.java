package com.shingu.hotel.service;

import com.shingu.hotel.entity.HotelEntity;
import com.shingu.hotel.entity.RoomEntity;
import com.shingu.hotel.repository.HotelRepository;
import com.shingu.hotel.repository.ReservationRepository;
import com.shingu.hotel.repository.RoomRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class HotelDataLoader {

    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;
    private final ReservationRepository reservationRepository;

    @PostConstruct
    public void init() {
        reservationRepository.deleteAll();
        roomRepository.deleteAll();
        hotelRepository.deleteAll();
        loadCsv();
    }

    public void loadCsv() {
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream("hotel_20230405.csv");
             BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {

            String line;
            reader.readLine(); // skip header

            // 🔽 호텔명 + 인실 조합별 이미지 매핑
            Map<String, String> hotelRoomImageMap = Map.ofEntries(
                    Map.entry("3S 부티끄 호텔-2인실", "https://your-bucket.s3.amazonaws.com/3SButikDouble.jpg"),
                    Map.entry("3S 부티끄 호텔-3인실", "https://your-bucket.s3.amazonaws.com/3SButikTriple.jpg"),
                    Map.entry("3S호텔 소래포구점-2인실", "https://your-bucket.s3.amazonaws.com/3SHotelSoraepoguDouble.jpg"),
                    Map.entry("3S호텔 소래포구점-4인실", "https://your-bucket.s3.amazonaws.com/3SHotelSoraepoguFor.jpg"),
                    Map.entry("반도 관광호텔-2인실", "https://your-bucket.s3.amazonaws.com/BandoDouble.jpg"),
                    Map.entry("베스트웨스턴 인천로얄호텔-2인실", "https://your-bucket.s3.amazonaws.com/BestWesternIncheonRoyalHotelDouble.jpg"),
                    Map.entry("베스트웨스턴 인천로얄호텔-4인실", "https://your-bucket.s3.amazonaws.com/BestWesternIncheonRoyalHotelFor.jpg"),
                    Map.entry("베스트웨스턴 인천로얄호텔-3인실", "https://your-bucket.s3.amazonaws.com/BestWesternIncheonRoyalHotelTriple.jpg"),
                    Map.entry("베스트웨스턴 프리미어 인천 에어포트 호텔-2인실", "https://your-bucket.s3.amazonaws.com/BestWesternPremierIncheonAirportDouble.jpg"),
                    Map.entry("베스트웨스턴 프리미어 인천 에어포트 호텔-1인실", "https://your-bucket.s3.amazonaws.com/BestWesternPremierIncheonAirportSingle.jpg"),
                    Map.entry("베스트웨스턴 프리미어 인천 에어포트 호텔-3인실", "https://your-bucket.s3.amazonaws.com/BestWesternPremierIncheonAirportTriple.jpg"),
                    Map.entry("다이아몬드 호텔-2인실", "https://your-bucket.s3.amazonaws.com/DiamondHotelDouble.jpg"),
                    Map.entry("다이아몬드 호텔-4인실", "https://your-bucket.s3.amazonaws.com/DiamondHotelFor.jpg"),
                    Map.entry("다이아몬드 호텔-3인실", "https://your-bucket.s3.amazonaws.com/DiamondHotelTriple.jpg"),
                    Map.entry("그랜드 하얏트 인천 이스트 타워-2인실", "https://your-bucket.s3.amazonaws.com/GrandHyattEastIncheonDouble.jpg"),
                    Map.entry("그랜드 하얏트 인천 이스트 타워-4인실", "https://your-bucket.s3.amazonaws.com/GrandHyattEastIncheonFor.jpg"),
                    Map.entry("그랜드 하얏트 인천 이스트 타워-3인실", "https://your-bucket.s3.amazonaws.com/GrandHyattEastIncheonTriple.jpg"),
                    Map.entry("그랜드하얏트인천 웨스트타워-2인실", "https://your-bucket.s3.amazonaws.com/GrandHyattWestIncheonDouble.jpg"),
                    Map.entry("그랜드하얏트인천 웨스트타워-4인실", "https://your-bucket.s3.amazonaws.com/GrandHyattWestIncheonFor.jpg"),
                    Map.entry("그랜드하얏트인천 웨스트타워-3인실", "https://your-bucket.s3.amazonaws.com/GrandHyattWestIncheonTriple.jpg"),
                    Map.entry("경원재 앰배서더 인천-2인실", "https://your-bucket.s3.amazonaws.com/GyeongwonjaeAmbassadorIncheonDouble.jpg"),
                    Map.entry("경원재 앰배서더 인천-1인실", "https://your-bucket.s3.amazonaws.com/GyeongwonjaeAmbassadorIncheonSingle.jpg"),
                    Map.entry("홀리데이 인 인천 송도 호텔-2인실", "https://your-bucket.s3.amazonaws.com/HolidayInIncheonSongdoHotelDouble.jpg"),
                    Map.entry("홀리데이 인 인천 송도 호텔-3인실", "https://your-bucket.s3.amazonaws.com/HolidayInIncheonSongdoHotelTriple.jpg"),
                    Map.entry("호텔498-2인실", "https://your-bucket.s3.amazonaws.com/Hotel498Double.jpg"),
                    Map.entry("호텔498-1인실", "https://your-bucket.s3.amazonaws.com/Hotel498Single.jpg"),
                    Map.entry("호텔498-3인실", "https://your-bucket.s3.amazonaws.com/Hotel498Triple.jpg"),
                    Map.entry("호텔 에어포트 준-2인실", "https://your-bucket.s3.amazonaws.com/HotelAirPortJoonDouble.jpg"),
                    Map.entry("호텔 에어포트 준-1인실", "https://your-bucket.s3.amazonaws.com/HotelAirPortJoonSingle.jpg"),
                    Map.entry("호텔 반월 구월동점-2인실", "https://your-bucket.s3.amazonaws.com/HotelBanwolGuwoldongDouble.jpg"),
                    Map.entry("호텔 반월 구월동점-4인실", "https://your-bucket.s3.amazonaws.com/HotelBanwolGuwoldongFor.jpg"),
                    Map.entry("호텔 반월 구월동점-3인실", "https://your-bucket.s3.amazonaws.com/HotelBanwolGuwoldongTriple.jpg"),
                    Map.entry("호텔 베이 204-2인실", "https://your-bucket.s3.amazonaws.com/HotelBay204Double.jpg"),
                    Map.entry("호텔 베이 204-4인실", "https://your-bucket.s3.amazonaws.com/HotelBay204For.jpg"),
                    Map.entry("호텔 베이 204-3인실", "https://your-bucket.s3.amazonaws.com/HotelBay204Triple.jpg"),
                    Map.entry("M 플레이스 호텔-2인실", "https://your-bucket.s3.amazonaws.com/HotelMPlaceDouble.jpg"),
                    Map.entry("M 플레이스 호텔-1인실", "https://your-bucket.s3.amazonaws.com/HotelMPlaceSingle.jpg"),
                    Map.entry("M 플레이스 호텔-3인실", "https://your-bucket.s3.amazonaws.com/HotelMPlaceTriple.jpg"),
                    Map.entry("인천 호텔 파이-2인실", "https://your-bucket.s3.amazonaws.com/HotelPiDouble.jpg"),
                    Map.entry("호텔시애틀 인천공항점-2인실", "https://your-bucket.s3.amazonaws.com/HotelSeattleIncheonAirportDouble.jpg"),
                    Map.entry("호텔시애틀 인천공항점-1인실", "https://your-bucket.s3.amazonaws.com/HotelSeattleIncheonAirportSingle.jpg"),
                    Map.entry("호텔시애틀 인천공항점-3인실", "https://your-bucket.s3.amazonaws.com/HotelSeattleIncheonAirportTriple.jpg"),
                    Map.entry("호텔소프라 (구. 조양관광호텔)-2인실", "https://your-bucket.s3.amazonaws.com/HotelSopraDouble.jpg"),
                    Map.entry("호텔소프라 (구. 조양관광호텔)-3인실", "https://your-bucket.s3.amazonaws.com/HotelSopraTriple.jpg"),
                    Map.entry("호텔 더 디자이너스 인천-2인실", "https://your-bucket.s3.amazonaws.com/HotelTheDesignersIncheonDouble.jpg"),
                    Map.entry("호텔 더 디자이너스 인천-4인실", "https://your-bucket.s3.amazonaws.com/HotelTheDesignersIncheonFor.jpg"),
                    Map.entry("호텔 더 디자이너스 인천-3인실", "https://your-bucket.s3.amazonaws.com/HotelTheDesignersIncheonTriple.jpg"),
                    Map.entry("인천 호텔 카리스-2인실", "https://your-bucket.s3.amazonaws.com/IncheonKarisHotelDouble.jpg"),
                    Map.entry("제이앤 파크 호텔-2인실", "https://your-bucket.s3.amazonaws.com/JandParkHotelDouble.jpg"),
                    Map.entry("제이앤 파크 호텔-4인실", "https://your-bucket.s3.amazonaws.com/JandParkHotelFor.jpg"),
                    Map.entry("제이앤 파크 호텔-1인실", "https://your-bucket.s3.amazonaws.com/JandParkHotelSingle.jpg"),
                    Map.entry("제이앤 파크 호텔-3인실", "https://your-bucket.s3.amazonaws.com/JandParkHotelTriple.jpg"),
                    Map.entry("네스트 호텔 (a member of Design Hotels™)-2인실", "https://your-bucket.s3.amazonaws.com/NestHotelDouble.jpg"),
                    Map.entry("네스트 호텔 (a member of Design Hotels™)-3인실", "https://your-bucket.s3.amazonaws.com/NestHotelTriple.jpg"),
                    Map.entry("오크우드 프리미어 인천 호텔-2인실", "https://your-bucket.s3.amazonaws.com/OakwoodPremierIncheonHotelDouble.jpg"),
                    Map.entry("오크우드 프리미어 인천 호텔-4인실", "https://your-bucket.s3.amazonaws.com/OakwoodPremierIncheonHotelFor.jpg"),
                    Map.entry("오크우드 프리미어 인천 호텔-3인실", "https://your-bucket.s3.amazonaws.com/OakwoodPremierIncheonHotelTriple.jpg"),
                    Map.entry("오라카이 송도 파크 호텔-2인실", "https://your-bucket.s3.amazonaws.com/OrakaiHotelDouble.jpg"),
                    Map.entry("오라카이 송도 파크 호텔-4인실", "https://your-bucket.s3.amazonaws.com/OrakaiHotelFor.jpg"),
                    Map.entry("오라카이 송도 파크 호텔-3인실", "https://your-bucket.s3.amazonaws.com/OrakaiHotelTriple.jpg"),
                    Map.entry("레이관광호텔-2인실", "https://your-bucket.s3.amazonaws.com/RayHotelDouble.jpg"),
                    Map.entry("레이관광호텔-4인실", "https://your-bucket.s3.amazonaws.com/RayHotelFor.jpg"),
                    Map.entry("레이관광호텔-3인실", "https://your-bucket.s3.amazonaws.com/RayHotelTriple.jpg"),
                    Map.entry("리버관광호텔-2인실", "https://your-bucket.s3.amazonaws.com/RiverHotelDouble.jpg"),
                    Map.entry("루비관광호텔 월미도-2인실", "https://your-bucket.s3.amazonaws.com/RubiHotelDouble.jpg"),
                    Map.entry("루비관광호텔 월미도-4인실", "https://your-bucket.s3.amazonaws.com/RubiHotelFor.jpg"),
                    Map.entry("루비관광호텔 월미도-3인실", "https://your-bucket.s3.amazonaws.com/RubiHotelTriple.jpg"),
                    Map.entry("선재해림-2인실", "https://your-bucket.s3.amazonaws.com/SunjaeHaerimDouble.jpg"),
                    Map.entry("선재해림-4인실", "https://your-bucket.s3.amazonaws.com/SunjaeHaerimFor.jpg"),
                    Map.entry("선재해림-3인실", "https://your-bucket.s3.amazonaws.com/SunjaeHaerimTriple.jpg"),
                    Map.entry("더프린스호텔-2인실", "https://your-bucket.s3.amazonaws.com/ThePrinceHotelDouble.jpg"),
                    Map.entry("더프린스호텔-4인실", "https://your-bucket.s3.amazonaws.com/ThePrinceHotelFor.jpg"),
                    Map.entry("더프린스호텔-3인실", "https://your-bucket.s3.amazonaws.com/ThePrinceHotelTriple.jpg"),
                    Map.entry("토요코인 인천부평점-2인실", "https://your-bucket.s3.amazonaws.com/ToyokoInnIncheonBupyeongDouble.jpg"),
                    Map.entry("토요코인 인천부평점-1인실", "https://your-bucket.s3.amazonaws.com/ToyokoInnIncheonBupyeongSingle.jpg"),
                    Map.entry("VOW관광호텔-2인실", "https://your-bucket.s3.amazonaws.com/VowHotelDouble.jpg"),
                    Map.entry("W 호텔-2인실", "https://your-bucket.s3.amazonaws.com/WHotelDouble.jpg"),
                    Map.entry("연화문 호텔-2인실", "https://your-bucket.s3.amazonaws.com/YeonHwaMoonHotelDouble.jpg"),
                    Map.entry("연화문 호텔-4인실", "https://your-bucket.s3.amazonaws.com/YeonHwaMoonHotelFor.jpg"),
                    Map.entry("연화문 호텔-1인실", "https://your-bucket.s3.amazonaws.com/YeonHwaMoonHotelSingle.jpg"),
                    Map.entry("연화문 호텔-3인실", "https://your-bucket.s3.amazonaws.com/YeonHwaMoonHotelTriple.jpg"),
                    Map.entry("영종관광호텔-2인실", "https://your-bucket.s3.amazonaws.com/YeongjongHotelDouble.jpg"),
                    Map.entry("영종관광호텔-1인실", "https://your-bucket.s3.amazonaws.com/YeongjongHotelSingle.jpg"),
                    Map.entry("쉐라톤 그랜드 인천 호텔-2인실", "https://your-bucket.s3.amazonaws.com/SheratonGrandIncheonHotelDouble.jpg"),
                    Map.entry("쉐라톤 그랜드 인천 호텔-3인실", "https://your-bucket.s3.amazonaws.com/SheratonGrandIncheonHotelTriple.jpg")
            );

            long hotelId = 28013;

            while ((line = reader.readLine()) != null) {
                String[] values = line.split(",", -1);

                HotelEntity hotel = new HotelEntity();
                hotel.setId(hotelId++);

                hotel.setGradingAgency(values[0]);
                hotel.setType(values[1]);
                hotel.setLevel(values[2]);
                hotel.setGradingDay(values[3]);
                hotel.setRegion(values[4]);
                hotel.setHotelName(values[5]);
                hotel.setNumberOfRooms(values[6]);
                hotel.setAddress(values[7]);
                hotel.setHotelNumber(values[8]);
                hotel.setHomePage(values[9]);
                hotel.setLatitude(values[10]);
                hotel.setLongitude(values[11]);
                double rating = parseDouble(values[12]);
                hotel.setRating(rating);
                hotelRepository.save(hotel);

                createRoomIfAvailable(hotel, values, 13, 14, "1인실", 1, hotelRoomImageMap);
                createRoomIfAvailable(hotel, values, 15, 16, "2인실", 2, hotelRoomImageMap);
                createRoomIfAvailable(hotel, values, 17, 18, "3인실", 3, hotelRoomImageMap);
                createRoomIfAvailable(hotel, values, 19, 20, "4인실", 4, hotelRoomImageMap);
            }

            System.out.println("✅ 호텔 및 객실 정보 CSV 로딩 완료!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void createRoomIfAvailable(HotelEntity hotel, String[] values, int hasRoomIndex, int priceIndex,
                                       String roomType, int people, Map<String, String> hotelRoomImageMap) {
        if ("Y".equalsIgnoreCase(values[hasRoomIndex]) || "있음".equalsIgnoreCase(values[hasRoomIndex].trim())) {
            RoomEntity room = new RoomEntity();
            room.setHotel(hotel);
            room.setRoomType(roomType);
            room.setMaxOccupancy(people);
            room.setPrice(parseDouble(values[priceIndex]));
            room.setReservationStatus("예약 가능");

            // 🔽 호텔명 + 인실 조합으로 이미지 매핑
            String key = hotel.getHotelName() + "-" + roomType;
            String imageUrl = hotelRoomImageMap.getOrDefault(key, "https://s3.amazonaws.com/hotel-images/default.jpg");
            room.setImageUrl(imageUrl);

            // 편의시설 (필요 시 인덱스 조정)
            room.setRefrigerator(values[21]);
            room.setTv(values[22]);
            room.setHeater(values[23]);
            room.setAirConditioner(values[24]);
            room.setBathtub(values[25]);
            room.setTerrace(values[26]);
            room.setCoffeeMaker(values[27]);
            room.setInternet(values[28]);
            room.setWashingMachine(values[29]);
            room.setIroningService(values[30]);
            room.setPrivatePool(values[31]);
            room.setPetFriendly(values[32]);
            room.setKitchen(values[33]);
            room.setParking(values[34]);
            room.setGym(values[35]);
            room.setDesk24Hour(values[36]);
            room.setNonSmokingRoom(values[37]);
            room.setSpaSauna(values[38]);
            room.setRestaurant(values[39]);
            room.setSmokingArea(values[40]);
            room.setDoubleBed(values[41]);
            room.setQueenBed(values[42]);
            room.setSingleBed(values[43]);

            roomRepository.save(room);
        }
    }

    private double parseDouble(String value) {
        try {
            return Double.parseDouble(value.trim().replaceAll(",", ""));
        } catch (Exception e) {
            return 0.0;
        }
    }
}
