package com.linklens.backend.service;

import com.linklens.backend.entity.LinkVariant;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class VariantSelectionService {

    private final Random random = new Random();

    public LinkVariant chooseVariant(List<LinkVariant> variants) {

        List<LinkVariant> activeVariants = variants.stream()
                .filter(LinkVariant::getActive)
                .toList();

        if (activeVariants.isEmpty()) {
            throw new IllegalStateException("No active variants found.");
        }

        int totalWeight = activeVariants.stream()
                .mapToInt(LinkVariant::getWeight)
                .sum();

        int randomNumber = random.nextInt(totalWeight) + 1;

        int cumulativeWeight = 0;

        for (LinkVariant variant : activeVariants) {

            cumulativeWeight += variant.getWeight();

            if (randomNumber <= cumulativeWeight) {
                return variant;
            }
        }

        return activeVariants.get(0);
    }
}