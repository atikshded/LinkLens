package com.linklens.backend.service;

import com.linklens.backend.entity.LinkVariant;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class VariantSelectionService {

    private final Random random = new Random();

    public LinkVariant chooseVariant(List<LinkVariant> variants) {

        int totalWeight = variants.stream()
                .mapToInt(LinkVariant::getWeight)
                .sum();

        int randomNumber = random.nextInt(totalWeight) + 1;

        int cumulativeWeight = 0;

        for (LinkVariant variant : variants) {

            cumulativeWeight += variant.getWeight();

            if (randomNumber <= cumulativeWeight) {
                return variant;
            }
        }

        return variants.get(0);
    }
}