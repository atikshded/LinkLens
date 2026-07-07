package com.linklens.backend.service;

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

    public ClickEventService(ClickEventRepository clickEventRepository) {
        this.clickEventRepository = clickEventRepository;
    }

    public void recordClick(
            Link link,
            String userAgent,
            String ipAddress) {
        Client client = UserAgentUtil.parse(userAgent);

        ClickEvent event = ClickEvent.builder()
                .clickedAt(LocalDateTime.now())
                .browser(client != null ? client.userAgent.family : null)
                .browserVersion(client != null ? client.userAgent.major : null)
                .operatingSystem(client != null ? client.os.family : null)
                .deviceType(client != null ? client.device.family : null)
                .userAgent(userAgent)
                .link(link)
                .ipAddress(ipAddress)
                .build();

        clickEventRepository.save(event);
    }
}