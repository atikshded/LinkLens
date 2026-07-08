package com.linklens.backend.service;

import com.linklens.backend.dto.GeoLocationResponse;
import com.linklens.backend.entity.ClickEvent;
import com.linklens.backend.entity.Link;
import com.linklens.backend.repository.ClickEventRepository;
import org.springframework.stereotype.Service;
import ua_parser.Client;
import com.linklens.backend.util.UserAgentUtil;

import java.time.LocalDateTime;

@Service
public class ClickEventService {

    private final ClickEventRepository clickEventRepository;
    private final GeoLocationService geoLocationService;

    public ClickEventService(
            ClickEventRepository clickEventRepository,
            GeoLocationService geoLocationService) {

        this.clickEventRepository = clickEventRepository;
        this.geoLocationService = geoLocationService;
    }

    public void recordClick(
            Link link,
            String userAgent,
            String ipAddress) {
        GeoLocationResponse location =
                geoLocationService.getLocation("8.8.8.8");

        Client client = UserAgentUtil.parse(userAgent);

        ClickEvent event = ClickEvent.builder()
                .clickedAt(LocalDateTime.now())
                .browser(client != null ? client.userAgent.family : null)
                .operatingSystem(client != null ? client.os.family : null)
                .deviceType(client != null ? client.device.family : null)
                .country(location != null ? location.getCountry() : null)
                .state(location != null ? location.getRegionName() : null)
                .city(location != null ? location.getCity() : null)
                .latitude(location != null ? location.getLat() : null)
                .longitude(location != null ? location.getLon() : null)
                .userAgent(userAgent)
                .link(link)
                .browserVersion(client != null ? client.userAgent.major : null)
                .ipAddress(ipAddress)
                .build();

        clickEventRepository.save(event);
    }
}